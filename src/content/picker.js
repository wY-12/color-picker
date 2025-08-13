// picker.js
(function () {
  const picker = async () => {
    if ('EyeDropper' in window) {
      const dropper = new EyeDropper();
      try {
        let { sRGBHex } = await dropper.open(),
          { r, g, b } = hexToRgb(sRGBHex),
          { h: hslH, s: hslS, l: hslL } = rgbToHsl(r, g, b),
          { h: hsvH, s: hsvS, v: hsvV } = rgbToHsv(r, g, b);
        chrome.runtime.sendMessage({
          type: "openPopupAndSendColor",
          color: {
            sRGBHex,
            rgb: { r, g, b },
            hsl: { h: hslH, s: hslS, l: hslL },
            hsv: { h: hsvH, s: hsvS, v: hsvV }
          }
        });
      } catch (error) {
        console.error('EyeDropper error:', error);
      }
    }
  }
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
    let bigint = parseInt(hex, 16),
      r = (bigint >> 16) & 255,
      g = (bigint >> 8) & 255,
      b = bigint & 255;
    return { r, g, b };
  }
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
    };
  }

  picker();
})();