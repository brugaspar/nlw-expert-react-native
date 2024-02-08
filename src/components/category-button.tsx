import { Text, Pressable, PressableProps } from "react-native";
import { clsx } from "clsx";

interface CategoryProps extends PressableProps {
  title: string;
  selected?: boolean;
}

export function CategoryButton({ title, selected, ...props }: CategoryProps) {
  return (
    <Pressable
      className={clsx(
        "bg-slate-800 px-4 justify-center rounded-md h-10 border border-[#0F172A]",
        selected && "border-lime-300"
      )}
      {...props}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
}
