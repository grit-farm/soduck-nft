import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { storyOdyssey } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [storyOdyssey],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [injected(), metaMask()],
  transports: {
    [storyOdyssey.id]: http(),
  },
});
