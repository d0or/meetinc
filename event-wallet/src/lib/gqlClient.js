import ApolloClient, { gql } from 'apollo-boost';


const client = new ApolloClient({
    uri: 'http://localhost:9002/graphql',
});

const allEventsQuery = gql`
{
    meetupCreateds {
      id
      url
      ipfs {
        url
        title
        image
        starts
        ends
        venue {
          location {
            lat
            lon
          }
        }
      }
    }
  }
`

const getAllEvents = async () => {
    const result = await client.query({ query: allEventsQuery })
    return result.data.meetupCreateds
}

export {
    client,

    getAllEvents

} 