import { FilterOutlined, DownOutlined, UpOutlined, FileExcelOutlined } from '@ant-design/icons';
import { Col, Row, Select, Space } from 'antd';
import Search from 'antd/es/input/Search';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { tw } from '../../../common/utils/classUtil';
import PrimaryButton from '../custom/PrimaryButton';

type FiltersType = {
  [key: string]: string[];
};

type SearchType = {
  [key: string]: string;
};

interface SearchFiltersToolBarProps {
  filters: FiltersType;
  handelOnChange: (filtersSelected: any) => void;
  isFilter?: boolean;
  isSearch?: boolean;
  placeholderSearch?: string;
}
interface ItemProps {
  label: string;
  value: string;
}

export default function SearchFiltersToolBar(props: SearchFiltersToolBarProps) {
  const { handelOnChange, filters, isFilter = true, isSearch = true, placeholderSearch } = props;

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [searchValue, setSearchValue] = useState<SearchType>({});
  const [filtersSelected, setFiltersSelected] = useState<FiltersType>({});

  const renderFilter = (filters: FiltersType) => {
    const listFilter: JSX.Element[] = [];

    const handleFilterChange = (key: string, newValue: string[]) => {
      setFiltersSelected((prevFiltersSelected) => ({
        ...prevFiltersSelected,
        [key]: newValue,
      }));
    };

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const filterValues = filters[key];
        const options: ItemProps[] = [];
        filterValues.map((filterValue) => {
          options.push({
            label: `${filterValue}`,
            value: filterValue,
          });
        });

        // Render filter container with label and values
        const filterSelect = (
          <div className="filter-item w-full mb-3 md:mb-0 md:w-60 md:mr-3" key={key}>
            <Title level={5}>Filter {key}</Title>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              options={options}
              value={filtersSelected[key]}
              onChange={(newValue: string[]) => {
                handleFilterChange(key, newValue);
              }}
              placeholder="Select Item..."
              maxTagCount="responsive"
            />
          </div>
        );
        listFilter.push(filterSelect);
      }
    }

    return listFilter;
  };
  const countFiltersSelected = (filtersSelected: FiltersType): number => {
    return Object.values(filtersSelected).reduce((totalCount, values) => totalCount + values.length, 0);
  };

  const numberFiltersSelected = countFiltersSelected(filtersSelected);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24} md={12}>
          <div className="flex space-x-2">
            <PrimaryButton
              className="h-10 w-1/2 md:w-40"
              typographyClassName="text-[#00a815] text-base font-medium"
              variant="default"
            >
              <FileExcelOutlined /> Export file
            </PrimaryButton>
            <PrimaryButton
              className="h-10 w-1/2 md:w-40"
              typographyClassName="text-[#00a815] text-base font-medium"
              variant="default"
            >
              <FileExcelOutlined /> Import file
            </PrimaryButton>
          </div>
        </Col>
        <Col span={24} md={12}>
          <div className="flex justify-end my-3 space-x-2">
            {isSearch && (
              <div className="flex-1">
                <Search
                  className={tw('[&_.ant-btn]:leading-none')}
                  placeholder={placeholderSearch ? placeholderSearch : 'Search...'}
                  allowClear
                  size="large"
                  onSearch={(value: string) => {
                    setSearchValue({ search: value });
                    handelOnChange(value ? { search: value, ...filtersSelected } : filtersSelected);
                  }}
                />
              </div>
            )}
            {isFilter && (
              <div>
                <PrimaryButton
                  className="h-full w-30"
                  typographyClassName="text-white"
                  variant="primary"
                  onClick={() => setIsOpenFilter(!isOpenFilter)}
                >
                  <FilterOutlined /> Filters {numberFiltersSelected !== 0 ? `(${numberFiltersSelected})` : ''}{' '}
                  {isOpenFilter ? (
                    <UpOutlined style={{ fontSize: '12px' }} />
                  ) : (
                    <DownOutlined style={{ fontSize: '12px' }} />
                  )}
                </PrimaryButton>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* FILTER AREA */}
      {isFilter && isOpenFilter && (
        <div className="mb-5 p-5 w-full border border-slate-300 rounded">
          <div className="flex flex-wrap flex-col md:flex-row">
            <div className="flex flex-wrap filter-area">{renderFilter(filters)}</div>
            <div className="flex items-end mt-3">
              <Space>
                <PrimaryButton className="w-20" variant="cancel" onClick={() => setFiltersSelected({})}>
                  Reset
                </PrimaryButton>
                <PrimaryButton
                  className="w-20"
                  variant="primary"
                  disabled={!(numberFiltersSelected > 0)}
                  onClick={() =>
                    handelOnChange(searchValue.search ? { ...searchValue, ...filtersSelected } : filtersSelected)
                  }
                >
                  Apply
                </PrimaryButton>
              </Space>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
