# Plate: Reproduction of useEditorSelection() not working with YjsPlugin

## Getting started
1. yarn install
2. yarn start
3. Visit http://localhost:5173
4. Write something in the little editor
5. Open console
6. Change selection
7. Observe that useEditorSelection() returns null / doesn't even execute

## Debugging
- In `main.tsx` comment out line 41 to see that useEditorSelection() works without YjsPlugin
- Install `@udecode/plate`, `@udecode/plate-core` and `@udecode/plate-yjs` @v43 to observe that it worked there