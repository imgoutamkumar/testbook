/* eslint-disable @typescript-eslint/no-explicit-any */

type tree = {
  ID: string
  Name: string
  ParentID: string | null
  children?: tree[]
}

export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1
) => {
  const range: (number | "dots")[] = []

  const start = Math.max(2, currentPage - siblingCount)
  const end = Math.min(totalPages - 1, currentPage + siblingCount)

  // Always show first page
  range.push(1)

  // Left dots
  if (start > 2) {
    range.push("dots")
  }

  // Middle pages
  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  // Right dots
  if (end < totalPages - 1) {
    range.push("dots")
  }

  // Always show last page
  if (totalPages > 1) {
    range.push(totalPages)
  }

  return range
}


export const buildTree = (nestedTree :tree[]) => {
  console.log("nestedTree",nestedTree)
  const map = {} as Record<string, tree & { children: tree[] }>
  const roots :tree[] = []

  // Step 1: create map
  nestedTree?.forEach((nt:tree) => {
      map[nt?.ID] = { ...nt, children: [] }
  })

  // Step 2: link children
  nestedTree?.forEach((nt:tree) => {
    if (nt?.ParentID) {
      if (map[nt?.ParentID]) {
        map[nt?.ParentID].children.push(map[nt?.ID])
      }
    } else {
      roots.push(map[nt?.ID])
    }
  })
console.log("map",map)
  return roots
}


export const mockTest = {
  id: "test_1",
  title: "IBPS PO Prelims Mock Test 1",
  durationSec: 3600,
  sections: [
    {
      id: "sec_1",
      name: "English Language",
      questions: [
        {
          id: "q1",
          text: "Choose the synonym for 'Abundant'.",
          options: [
            { id: "o1", text: "Plentiful" },
            { id: "o2", text: "Scarce" },
            { id: "o3", text: "Rare" },
            { id: "o4", text: "Short" },
          ],
        },
        {
          id: "q2",
          context: `<strong>Directions: Read the following passage carefully and answer the questions.</strong><br/><br/>
                    In the heart of the bustling city, a small park remained a sanctuary for the locals. Despite the rapid urbanization and towering skyscrapers that shadowed it, the park's ancient oak tree stood as a testament to resilience. City planners had debated tearing it down for a new parking lot, but community protests halted the development.<br/><br/>
                    The park wasn't just a patch of green; it was a historical landmark where the town's founders first met in 1842. Today, it serves as a critical ecosystem for urban birds and a quiet escape for office workers.`,
          text: "Why did the city planners want to tear down the park?",
          options: [
            { id: "o5", text: "To build a shopping mall" },
            { id: "o6", text: "To create a new parking lot" },
            { id: "o7", text: "To plant more trees" },
            { id: "o8", text: "To build a memorial" },
          ],
        },
        {
          id: "q3",
          context: `<strong>Directions: Read the following passage carefully and answer the questions.</strong><br/><br/>
                    In the heart of the bustling city, a small park remained a sanctuary for the locals. Despite the rapid urbanization and towering skyscrapers that shadowed it, the park's ancient oak tree stood as a testament to resilience. City planners had debated tearing it down for a new parking lot, but community protests halted the development.<br/><br/>
                    The park wasn't just a patch of green; it was a historical landmark where the town's founders first met in 1842. Today, it serves as a critical ecosystem for urban birds and a quiet escape for office workers.`,
          text: "In what year did the town's founders first meet in the park?",
          options: [
            { id: "o9", text: "1840" },
            { id: "o10", text: "1842" },
            { id: "o11", text: "1850" },
            { id: "o12", text: "1900" },
          ],
        },
      ],
    },
    {
      id: "sec_2",
      name: "Quantitative Aptitude",
      questions: [
        {
          id: "q4",
          context: `<strong>Directions: Study the following table carefully and answer the questions.</strong><br/><br/>
                    <p class="mb-2">Sales of Company X (in thousands)</p>
                    <table border="1" style="width:100%; border-collapse: collapse; text-align: center; margin-bottom: 20px;">
                      <tr style="background:#f3f4f6;"><th>Year</th><th>Product A</th><th>Product B</th></tr>
                      <tr><td>2020</td><td>120</td><td>150</td></tr>
                      <tr><td>2021</td><td>140</td><td>180</td></tr>
                      <tr><td>2022</td><td>170</td><td>210</td></tr>
                    </table>`,
          text: "What is the total sales of Product A across all given years?",
          options: [
            { id: "o13", text: "410" },
            { id: "o14", text: "430" },
            { id: "o15", text: "450" },
            { id: "o16", text: "480" },
          ],
        },
        {
          id: "q5",
          text: "What is 15% of 800?",
          options: [
            { id: "o17", text: "100" },
            { id: "o18", text: "120" },
            { id: "o19", text: "140" },
            { id: "o20", text: "150" },
          ],
        },
      ],
    },
  ],
};