import React, { useMemo, useRef, useState } from "react";
import { Select, Spin, Avatar } from "antd";
import type { SelectProps } from "antd";
import debounce from "lodash.debounce";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  defaultOptions?: ValueType[];
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    symbol: React.ReactNode;
    price: string | number;
    logo?: string;
  } = any
>({
  fetchOptions,
  debounceTimeout = 300,
  defaultOptions = [],
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      className="bg-transparent"
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      {...props}
      options={options}
      optionRender={(option) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {option.data.logo && (
            <Avatar src={option.data.logo} style={{ marginRight: 8 }} />
          )}
          {option.data.symbol}
        </div>
      )}
      notFoundContent={
        <div>
          {defaultOptions.map((option) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              {option.logo && (
                <Avatar src={option.logo} style={{ marginRight: 8 }} />
              )}
              {option.symbol}
            </div>
          ))}
        </div>
      }
    />
  );
}
export default DebounceSelect;
