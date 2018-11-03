### Requirements
- yarn
- node v8.3

### Installation

```
git clone https://github.com/madelynkasula/cheerly-frontend.git
cd cheerly-frontend
yarn install
expo start
```

Once the Expo Metro Bundler has opened in a browser at localhost:19002, you can use Expo to run an Android or iOS simulator.

### A Contrived Example
```
import React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`{
  categories {
    id
    title
  }
}`

export default class CategoriesScreen extends React.Component {
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(</Text>;

          return data.categories.map(({ id, title }) => (
            <View key={id}>
              <Text>{`${id}: ${title}`}</Text>
            </View>
          ));
        }}
      </Query>
    );
  }
}
```