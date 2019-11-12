import React from 'react';
import PropTypes from 'prop-types';

import { Container, Td, Th } from './styles';

export default function Table({ data, headers, keyExtractor }) {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <Th key={header.key} align={header.align}>
                {header.title}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={keyExtractor(item)}>
              {headers.map(header => (
                <Td key={header.key} align={header.align}>
                  {item[header.key]}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  keyExtractor: PropTypes.func,
};

Table.defaultProps = {
  keyExtractor: item => item.id,
};
