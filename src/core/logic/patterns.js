/* eslint-disable consistent-return, no-restricted-syntax,padded-blocks,no-multi-spaces,key-spacing,comma-dangle,max-len,no-mixed-operators,curly,comma-spacing,comma-style,no-useless-computed-key */
export const getVersion = (memory) => {
  if (memory.findStrPattern('Alpha 0.5.3.3368').length > 0)
    return { client: 'alpha', build: '0.5.3' };
  if (memory.findStrPattern('Alpha 0.8.0.3734').length > 0)
    return { client: 'alpha', build: '0.8.0' };
  if (memory.findStrPattern('World of Warcraft Vanilla 1.8').length > 0)
    return { client: 'vanilla', build: '1.8.0' };
  if (memory.findStrPattern('World of WarCraft (build 5875)').length > 0)
    return { client: 'vanilla', build: '1.12.0' };
  if (memory.findStrPattern('World of WarCraft (build 8606)').length > 0)
    return { client: 'tbc', build: '2.4.3' };

  return undefined;
};

export const vanilla = {
  camera: {
    pattern: new Buffer([0x8B, 0x10, 0x8D, 0x4E, 0x08, 0x89, 0x11, 0x8B, 0x50, 0x04, 0x89, 0x51, 0x04, 0x8B, 0x40, 0x08, 0x89, 0x41, 0x08]),
    fix:     new Buffer([0x8B, 0x10, 0x8D, 0x4E, 0x08, 0x90, 0x90, 0x8B, 0x50, 0x04, 0x90, 0x90, 0x90, 0x8B, 0x40, 0x08, 0x90, 0x90, 0x90]),
    base: {
      pattern: new Buffer([0x8B ,0x11 ,0x8D ,0x45 ,0xF4 ,0x50 ,0xFF ,0x52
        ,0x04 ,0x8B ,0x4D ,0xF4 ,0x8B ,0x55 ,0xF8 ,0x8B ,0x45 ,0xFC ,0x89
        ,0x0E ,0x89 ,0x56 ,0x04 ,0x89 ,0x46 ,0x08 ,0x5E ,0x8B ,0xE5 ,0x5D]),
      patternFix: -0xD,
      version: {
        ['1.8.0']: {
          ptrFix: [0x6570, 0]
        },
        ['1.12.0']: {
          ptrFix: [0x65B8, 0]
        }
      }
    }
  },
  cameraViewMatrix: {
    version: {
      ['1.8.0']: {
        pattern: new Buffer([0xE8, 0x5F, 0xF1, 0xE6, 0xFF, 0xB9, 0x09, 0x00, 0x00, 0x00, 0x8D, 0xB5, 0x60, 0xFF, 0xFF, 0xFF, 0xF3, 0xA5]),
        fix:     new Buffer([0xE8, 0x5F, 0xF1, 0xE6, 0xFF, 0xB9, 0x09, 0x00, 0x00, 0x00, 0x8D, 0xB5, 0x60, 0xFF, 0xFF, 0xFF, 0x90, 0x90])
      },
      ['1.12.0']: {
        pattern: new Buffer([0xE8, 0x0F, 0x97, 0xE3, 0xFF, 0xB9, 0x09, 0x00, 0x00, 0x00, 0x8D, 0xB5, 0x60, 0xFF, 0xFF, 0xFF, 0xF3, 0xA5]),
        fix:     new Buffer([0xE8, 0x0F, 0x97, 0xE3, 0xFF, 0xB9, 0x09, 0x00, 0x00, 0x00, 0x8D, 0xB5, 0x60, 0xFF, 0xFF, 0xFF, 0x90,  0x90])
      }
    }
  }
};

export const alpha = {
  camera: {
    pattern: new Buffer([0x89, 0x02, 0xD9, 0x5D, 0xF8, 0x8B,
      0x4D, 0xF8, 0xDD, 0xD8, 0x89, 0x4A, 0x04, 0xDD, 0xD8,
      0xD9, 0x45, 0xF0, 0xD8, 0x65, 0xE4, 0xD9, 0x5D, 0xFC,
      0xD9, 0x86, 0xD4, 0x00, 0x00, 0x00, 0x8B, 0x45, 0xFC,
      0xD8, 0x65, 0x08, 0x89, 0x42, 0x08]),
    fix:     new Buffer([0x90, 0x90, 0xD9, 0x5D, 0xF8, 0x8B,
      0x4D, 0xF8, 0xDD, 0xD8, 0x90, 0x90, 0x90, 0xDD, 0xD8,
      0xD9, 0x45, 0xF0, 0xD8, 0x65, 0xE4, 0xD9, 0x5D, 0xFC,
      0xD9, 0x86, 0xD4, 0x00, 0x00, 0x00, 0x8B, 0x45, 0xFC,
      0xD8, 0x65, 0x08, 0x90, 0x90, 0x90]),
    base: {
      pattern: new Buffer([0xC6, 0x83, 0x88, 0x00, 0x00, 0x00, 0x00, 0x8B,
        0x7D, 0x0C, 0x8B, 0xC3, 0xC1, 0xE8, 0x10, 0x66, 0x89, 0x45, 0xFC,
        0x66, 0xC7, 0x45, 0xFE, 0x6D, 0x6F, 0x8B, 0x4D, 0xFC, 0x89, 0x4B,
        0x0C]),
      patternFix: 0x22,
      version: {
        ['0.5.3']: {
          ptrFix: 0x3D4
        },
        ['0.8.0']: {
          ptrFix: 0x6C
        }
      }
    }
  },
  cameraViewMatrix: {
    version: {
      ['0.5.3']: {
        pattern: new Buffer([0x8D, 0x8D, 0x70, 0xFF, 0xFF, 0xFF, 0xE8, 0x34, 0x5E, 0xFA, 0xFF, 0xB9, 0x09, 0x00, 0x00, 0x00, 0x8D, 0xB5, 0x70, 0xFF, 0xFF, 0xFF, 0xF3, 0xA5]),
        fix:     new Buffer([0x8D, 0x8D, 0x70, 0xFF, 0xFF, 0xFF, 0xE8, 0x34, 0x5E, 0xFA, 0xFF, 0xB9, 0x09, 0x00, 0x00, 0x00, 0x8D, 0xB5, 0x70, 0xFF, 0xFF, 0xFF, 0x90, 0x90])
      },
      ['0.8.0']: {
        pattern: new Buffer([0xE8, 0x94, 0x80, 0xFA, 0xFF, 0xB9, 0x09, 0x00, 0x00, 0x00, 0x8D, 0xB5, 0x70, 0xFF, 0xFF, 0xFF, 0xF3, 0xA5]),
        fix:     new Buffer([0xE8, 0x94, 0x80, 0xFA, 0xFF, 0xB9, 0x09, 0x00, 0x00, 0x00, 0x8D, 0xB5, 0x70, 0xFF, 0xFF, 0xFF, 0x90, 0x90])
      }
    }
  }
};

export const tbc = {
  SpectatePointer: [0x00871B94, 0xCC, 0x49C],
  EnableSpectate: new Buffer([0x00, 0x00, 0x7F, 0x43]),
  DisableSpectate: new Buffer([0, 0, 0, 0]),
  CameraValuesPointer: 0,
};
