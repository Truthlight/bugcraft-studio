const Robot = require('robot-js');
const Keyboard = Robot.Keyboard;
const Mouse = Robot.Mouse;

function EnableKeyboardControls(Game, EnableSpectate, EnableViewMatrixUpdate, GetCameraData, SetPosition, SetSpeed, Offsets, Memory) {
  return (CameraStruct, speed) => {
    const {
      Pointer,
      ViewMatrixInstructionsPointer,
    } = CameraStruct;
    if (!(Game.client === 'vanilla') && !(Game.client === 'alpha')) {
      EnableSpectate(CameraStruct, Pointer);
      EnableViewMatrixUpdate(ViewMatrixInstructionsPointer);
      SetSpeed(CameraStruct, speed);
      return 1;
    }

    const enableCameraFacingBuffer = new Buffer([0xD6, 0x00, 0x00, 0x00, 0x61, 0x0E, 0xC2, 0x12, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    const enableCameraFacingPtr = Offsets[Game.client].enableCameraFacing;
    Memory.writeData(Pointer + enableCameraFacingPtr, enableCameraFacingBuffer, enableCameraFacingBuffer.byteLength);

    EnableSpectate(CameraStruct, Pointer);
    EnableViewMatrixUpdate(ViewMatrixInstructionsPointer);
    return setInterval(() => {
      if (Robot.Window.getActive().getTitle() !== 'World of Warcraft') {
        return; // only move the camera if the active window is the game window
      }

      const camera = GetCameraData(Pointer);
      const state = Mouse.getState();
      if (Keyboard.getState(Robot.KEY_W) || (state[Robot.BUTTON_LEFT] && state[Robot.BUTTON_RIGHT])) {
        const x = camera.position.x + camera.forward.x * speed;
        const y = camera.position.y + camera.forward.y * speed;
        const z = camera.position.z + camera.forward.z * speed;
        return SetPosition(CameraStruct, x, y, z);
      }
      if (Keyboard.getState(Robot.KEY_S)) {
        const x = camera.position.x - camera.forward.x * speed;
        const y = camera.position.y - camera.forward.y * speed;
        const z = camera.position.z - camera.forward.z * speed;
        return SetPosition(CameraStruct, x, y, z);
      }
      if (Keyboard.getState(Robot.KEY_SPACE)) {
        const x = camera.position.x;
        const y = camera.position.y;
        const z = camera.position.z + speed;
        return SetPosition(CameraStruct, x, y, z);
      }
      if (Keyboard.getState(Robot.KEY_LCONTROL)) {
        const x = camera.position.x;
        const y = camera.position.y;
        const z = camera.position.z - speed;
        return SetPosition(CameraStruct, x, y, z);
      }
    }, 0);
  };
}

module.exports = EnableKeyboardControls;
