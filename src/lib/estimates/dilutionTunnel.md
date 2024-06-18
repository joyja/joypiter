<script lang="ts">
  import { convertToTable, calcSubtotals } from '$lib/estimate.js'
  import Table from '$lib/components/Table.svelte'
  const rate = 200
  const projectData = [
    { milestone: 'Dilution Tunnel Data Collection', percentage: .3 },
    { milestone: 'Dilution Tunnel Control Logic', weeks: 1 },
    { milestone: 'Dilution Tunnel User Interface', weeks: 1 },
    { milestone: 'Dilution Tunnel Startup', weeks: 1 },
  ]
  const text = 'blah'
  const tableContents = convertToTable(calcSubtotals(rate, projectData))

</script>


<Table contents={tableContents} />

```plantuml
  @startgantt
  [Dilution Tunnel Data Collection] as [t1] requires 7 days
  [Dilution Tunnel Control Logic] as [t2] requires 7 days
  [t2] starts at [t1]'s end
  [Dilution Tunnel User Interface] as [t3] requires 7 days
  [t3] starts at [t2]'s end
  [Dilution Tunnel Startup] as [t4] requires 7 days
  [t4] starts at [t3]'s end
  @endgantt
```