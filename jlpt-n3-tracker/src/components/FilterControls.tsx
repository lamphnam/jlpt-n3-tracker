import { Button } from "@/components/ui/button";

export type FilterType = 'all' | 'completed' | 'incomplete';

type FilterControlsProps = {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
};

export function FilterControls({ activeFilter, onFilterChange }: FilterControlsProps) {
    const filters: { label: string; value: FilterType }[] = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Đã xong', value: 'completed' },
        { label: 'Chưa xong', value: 'incomplete' },
    ];

    return (
        <div className="flex items-center gap-2 p-1 bg-muted rounded-md">
            {filters.map(filter => (
                <Button
                    key={filter.value}
                    variant={activeFilter === filter.value ? 'default' : 'ghost'}
                    size="sm"
                    className="flex-1"
                    onClick={() => onFilterChange(filter.value)}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
}