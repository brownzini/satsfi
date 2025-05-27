export default function soundEffect(param:string) {
  const typeSound = {
    confirm: "/audio/ok.MP3",
    connected: "/audio/connected.MP3",
    disconnected: "/audio/disconnected.MP3",
    rejected: "/audio/rejected.MP3",
  };
  //@ts-ignore
  const audio = new Audio(typeSound[param]);
  audio.volume = 1;
  audio.play();
}
