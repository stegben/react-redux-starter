## Store:
```javascript
{
  auth: {
    authenticated: (true/false),
    error: '',
  },
  queryHistory: {
    allQueries: {
      edges: [
        {
          node: {
            id: '...',
            name: 'query name',
            desc: 'query description',
            queryBody: '{\"size\": 100, \"query\": {\"match_phrase\": {\"content\": \"\\u80af\\u4e9e\"}}}',
            createdAt: "2016-06-23T07:09:39.740757+00:00",
            updatedAt: "2016-06-23T07:09:39.740800+00:00",
          }
        }
      ]
    },
  },
}
```
