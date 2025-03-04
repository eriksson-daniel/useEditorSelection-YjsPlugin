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

In `main.tsx` flip the boolean on line 39 to see that useEditorSelection() works without YjsPlugin
