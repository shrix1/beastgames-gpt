import { BlurImage } from "../blur-image";
import { finalSix } from "@/lib/constants";
import { Button } from "../ui/button";

export default function FinalSixCard({
  person,
}: {
  person: (typeof finalSix)[0];
}) {
  return (
    <div className="rounded-lg relative w-[130px] h-[140px] bg-green-400 flex justify-center overflow-hidden group/card cursor-pointer">
      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-br group-hover/card:opacity-0 transform transition-opacity duration-300 from-transparent via-black/10 to-black/80 z-[4]" />
      <p className="absolute text-xl text-white bottom-1 right-1 z-[5] font-mono group-hover/card:hidden">
        #{person.id}
      </p>
      <div className="bg-white/70 group-hover/card:opacity-100 opacity-0 backdrop-blur-sm w-full h-full flex flex-col gap-3 justify-center items-center z-[10] absolute inset-0">
        <p className="text-xl font-bold text-black font-mono">{person.name}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-fit shadow-xl hover:bg-green-500"
        >
          Vote for #{person.id}
        </Button>
      </div>
      <BlurImage
        src={person.image}
        alt={person.name}
        width={130}
        height={100}
      />
      <p className="text-white text-sm font-mono absolute bottom-1 z-[9] left-1">
        30%
      </p>
      <div className="w-[25%] h-full absolute inset-0 rotate-180 z-[7]">
        <div
          style={{ height: "40%" }}
          className="max-h-full w-full bg-green-500 rounded-bl-lg transition-all duration-300"
        ></div>
      </div>
    </div>
  );
}
