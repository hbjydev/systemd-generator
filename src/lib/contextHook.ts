import { useState } from "react"
import type { ContextSkeleton } from "./context"

export function useContextSetup<T>(initialData: ContextSkeleton<T>['data']) {
    const [data, setData] = useState<ContextSkeleton<T>['data']>(initialData);

    const update: ContextSkeleton<T>['update'] = (newData) => {
      setData({ ...data, ...newData } as ContextSkeleton<T>['data']);
    }

    const value: ContextSkeleton<T> = {
        data,
        update
    };

    return value;
}