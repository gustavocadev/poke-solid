import {
  createComputed,
  createEffect,
  createMemo,
  createSignal,
} from 'solid-js';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export default function Home() {
  const [pokeId, setPokeId] = createSignal(1);
  const [isImageLoaded, setIsImageLoaded] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);

  createEffect(() => {
    setIsImageLoaded(true);
  }, []);

  const urlImg = createMemo(() => {
    setIsImageLoaded(false);
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId()}.png`;

    return url;
  });

  return (
    <main class="py-4 text-center h-screen bg-gradient-to-r from-blue-800 to-stone-900 space-y-4">
      {!isImageLoaded() && <span>Cargando...</span>}
      <img
        src={urlImg()}
        alt=""
        onLoad={() => {
          setTimeout(() => {
            setIsImageLoaded(true);
          }, 500);
        }}
        class={cn(
          {
            hidden: !isImageLoaded(),
            'brightness-0': !isVisible(),
          },
          'size-52 mx-auto transition-all',
        )}
      />
      <p class="text-3xl text-gray-200">Pokemon ID: {pokeId()}</p>

      <div class="space-x-2">
        <Button
          onClick={() => setPokeId(Math.max(pokeId() - 1, 1))}
          type="button"
        >
          Anteriores
        </Button>
        <Button onClick={() => setPokeId(pokeId() + 1)} type="button">
          Siguientes
        </Button>

        <Button
          onClick={() => {
            setIsVisible(!isVisible());
          }}
          type="button"
        >
          {isVisible() ? 'Ocultar' : 'Revelar'}
        </Button>
      </div>
    </main>
  );
}
