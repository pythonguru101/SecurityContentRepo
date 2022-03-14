//@ts-check
import Search from 'antd/lib/input/Search';
import React from 'react';

const SearchCustom = ({
    onSearch,
    onChange,
    placeholder = 'Search',
    size = 'large',
    style = {},
    isLoading = false
}) => {
    return (
        <Search
            placeholder={placeholder}
            allowClear
            onSearch={onSearch}
            style={style}
            size={size}
            onChange={({ target }) => {
                onChange(target.value);
            }}
            loading={isLoading}
        />
    );
};

export default SearchCustom;
