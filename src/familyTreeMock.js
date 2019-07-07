export default [
  {
    name: 'Ramesh',
    key: 'Ramesh',
    attributes: {
      City: 'NY',
      Gender: 'Male',
      'Fav Color': 'Green',
    },
    children: [
      {
        name: 'Suresh',
        key: 'Ramesh.Suresh',
        attributes: {
          City: 'Delhi',
          Gender: 'Male',
          'Fav Color': 'Blue',
        },
      },
      {
        name: 'Jitesh',
        key: 'Ramesh.Jitesh',
        children: [
          {
            name: 'Rakesh',
            key: 'Ramesh.Jitesh.Rakesh',
            attributes: {
              City: 'Hyd',
              Gender: 'Female',
            },
          },
        ],
      },
    ],
  },
];
