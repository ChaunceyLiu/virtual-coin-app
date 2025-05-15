import React, { useMemo, useRef, useState } from "react";
import { Select, Avatar } from "antd";
import type { SelectProps } from "antd";
import debounce from "lodash.debounce";
import hn from "human-number";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  defaultOptions?: ValueType[];
}

function DebounceSelect<
  ValueType extends {
    price_change_percent: any;
    total_supply: any;
    liquidity: any;
    volume: any;
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
      virtual
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
        <div className="max-h-[500px] overflow-y-auto">
          {defaultOptions.map((option, index) => (
            <div key={index} className="flex items-center text-[#333]">
              {option.logo && (
                <div className="min-w-[60px]">
                  <Avatar src={option.logo} className="mr-8" size={60} />
                </div>
              )}
              <div className="font-bold text-[14px] px-1 w-[120px]">
                {option.symbol}
              </div>
              <div className="text-[11px] pr-4">
                <p>{`24h V $${parseInt(hn(option.volume))}`}</p>
                <p>{`LIQ $${parseInt(hn(option.liquidity))}`}</p>
              </div>
              <div className="text-[11px]">
                <p>
                  {`$${parseInt(hn(option.total_supply))}`}
                  <span
                    className={
                      option.price_change_percent > 0
                        ? "text-green-900"
                        : "text-red-900"
                    }
                  >{`         ${option.price_change_percent.toFixed(
                    2
                  )}%`}</span>
                </p>
                <p>24h MC</p>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
export default DebounceSelect;
