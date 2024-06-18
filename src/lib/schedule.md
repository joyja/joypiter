<script>
  import Table from '$lib/components/Table.svelte'
  import * as R from 'ramda'
  let count = 3

  const rate = 200

const projectData = [
  { milestone: 'Dilution Tunnel Data Collection', rate: .3 },
  { milestone: 'Dilution Tunnel Control Logic', weeks: 1 },
  { milestone: 'Dilution Tunnel User Interface', weeks: 1 },
  { milestone: 'Dilution Tunnel Startup', weeks: 1 },
]

const calculateRow = R.curry((milestone) => R.assoc(['total'],R.pipe(
  R.multiply(40),
  R.multiply(rate)
)(milestone.weeks),milestone))

R.map(calculateRow,projectData)

  const tableContents = {
    headers: ['three', 'one', 'four'],
    rows: [['1', '2', '3'], ['3', '2', '1']]
  }
</script>

# Test

```plantuml
Alice -> Bob: Hello Bob, how are you?
```

one-two, **one-two**,  *three*

- one
- two
- three

| one       | two  | three         |
| --------- | ---- | ------------- |
| anotherom | ting | sometinoingng |
| asdfaf    |      |               |


| one   | two | three |
| ----- | --- | ----- |
| one   | two | three |
| three | two | one   |

| one                  | two           | three             |
| -------------------- | ------------- | ----------------- |
| something            | another thing | and a third thing |
| This extension works | good          | thank god         |
|                      |               | {count}           |
|                      |               |                   |

<Table contents={tableContents}/>