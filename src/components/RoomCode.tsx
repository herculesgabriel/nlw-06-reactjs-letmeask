import '../styles/room-code.scss';

import copyImg from '../assets/images/copy.svg';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button type="button" onClick={copyRoomCodeToClipboard} className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>

      <span>Sala #{code}</span>
    </button>
  );
}
