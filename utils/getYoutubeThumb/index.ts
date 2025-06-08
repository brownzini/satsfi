import axios from 'axios';

export default async function getYouTubeThumbnail(videoUrl: string): Promise<string | null> {
  try {
    // Extrai o ID do vídeo
    const videoIdMatch = videoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!videoIdMatch) {
      throw new Error('ID do vídeo inválido.');
    }

    const videoId = videoIdMatch[1];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Verifica se a thumbnail existe
    const response = await axios.get(thumbnailUrl, { responseType: 'arraybuffer' });
    if (response.status === 200) {
      return thumbnailUrl;
    }

    return null;
  } catch (error:any) {
    return null;
  }
}
