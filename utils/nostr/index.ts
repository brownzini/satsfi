//Nostr
import { SimplePool } from "nostr-tools";

const relayList = [
  "wss://nos.lol",
  "wss://relay.snort.social",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.oxtr.dev",
  "wss://relay.nostr.band",
  "wss://relay.damus.io",
  "wss://relay.mostr.pub",
  "wss://relay.nostr.wirednet.jp",
  "wss://relay.nostrplebs.com",
  "wss://relay.wellorder.net",
  "wss://nostr.mom",
  "wss://nostr.slothy.win",
  "wss://nostrja-kari.heguro.com",
  "wss://relay.nostr.com.au",
];

export const getContent = async (id: string, time: number = 3000) => {
  await new Promise((resolve) => setTimeout(resolve, time));
  const pool = new SimplePool();
  try {
    const event = await pool.get(relayList, {
      ids: [id],
    });
    if (event) {
      pool.close(relayList);
      return event.content;
    } else {
      pool.close(relayList);
      return "";
    }
  } catch (err) {
    pool.close(relayList);
    return "";
  }
};