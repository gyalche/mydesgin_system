import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Atoms/Input';
import Typography from 'components/Atoms/Typography';
import { Flex, Block } from 'components/Atoms/Layout';

import styles from './style.module.css';

function AssetGallery({
  itemsByCategory,
  renderItem,
  searchPlaceholder,
  copyFormat,
  itemWrapperClassName,
  itemClassName,
}) {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const copyToClipboard = itemName => {
    navigator.clipboard.writeText(copyFormat(itemName));
    setCopied(itemName);
    setTimeout(() => setCopied(null), 800);
  };

  const filteredItems = useMemo(() => {
    const result = {};

    if (!search) {
      return itemsByCategory;
    }

    Object.keys(itemsByCategory).forEach(category => {
      const filtered = itemsByCategory[category].filter(item => item.toLowerCase().includes(search.toLowerCase()));

      if (filtered.length) {
        result[category] = filtered;
      }
    });

    return result;
  }, [search, itemsByCategory]);

  return (
    <Flex
      direction="column"
      w="100%"
      maxH="700px"
      pt="20px"
      pr="20px"
      pb="20px"
      pl="20px"
      overflowY="auto"
    >
      <Input
        type="text"
        placeholder={searchPlaceholder}
        value={search}
        onChange={handleSearch}
        w="100%"
        className={styles.searchBar}
      />

      {Object.keys(filteredItems).length === 0 ? (
        <Typography level="p1" as="p">No items found matching your search.</Typography>
      ) : (
        Object.keys(filteredItems).map(category => (
          <Block key={category}>
            <Typography level="h3" as="h3" className={styles.categoryTitle}>
              {category}
              {' '}
              (
              {filteredItems[category].length}
              )
            </Typography>
            <div className={styles.grid}>
              {filteredItems[category].map(itemName => (
                <button
                  key={itemName}
                  className={styles.card}
                  onClick={() => copyToClipboard(itemName)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      copyToClipboard(itemName);
                    }
                  }}
                  type="button"
                  aria-label={`Copy ${itemName} code`}
                >
                  <div className={itemWrapperClassName || styles.itemWrapper}>
                    {renderItem(itemName)}
                  </div>
                  <Typography level="p2" as="div" className={itemClassName || styles.itemName}>{itemName}</Typography>
                  {copied === itemName && (
                    <div className={styles.copied}>Copied!</div>
                  )}
                </button>
              ))}
            </div>
          </Block>
        ))
      )}
    </Flex>
  );
}

AssetGallery.propTypes = {
  itemsByCategory: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  renderItem: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
  copyFormat: PropTypes.func.isRequired,
  itemWrapperClassName: PropTypes.string,
  itemClassName: PropTypes.string,
};

AssetGallery.defaultProps = {
  searchPlaceholder: 'Search...',
  itemWrapperClassName: null,
  itemClassName: null,
};

export default AssetGallery;
