import Select from "react-select";

interface CharacterSelectProps {
  onSelect: (value: string) => void;
  onSearch: (inputValue: string) => void;
  options: { label: string; value: string }[];
  disabled: boolean;
}

export default function CharacterSelect({
  onSelect,
  onSearch,
  options,
  disabled,
}: CharacterSelectProps) {
  return (
    <Select
      options={options}
      onChange={(selectedOption) => onSelect(selectedOption?.value || "")}
      onInputChange={onSearch}
      placeholder="Search for the character's name"
      isDisabled={disabled}
      instanceId="character-select"
      noOptionsMessage={() => "No results found"}
      className="text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
