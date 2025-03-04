import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import type { TElement } from '@udecode/plate';
import { createPlateEditor, createPlatePlugin, useEditorSelection as useEditorSelectionFromPlateCore } from '@udecode/plate-core/react';
import { YjsPlugin } from '@udecode/plate-yjs/react';
import {
  Plate,
  PlateContent,
  PlateElement,
  type PlateElementProps,
  useEditorSelection as useEditorSelectionFromPlate,
} from '@udecode/plate/react';

interface Paragraph extends TElement {
  type: 'paragraph';
  children: { text: string }[];
}

const ParagraphElement = ({
  children,
  element: _element,
  elementToAttributes: _elementToAttributes,
  ...props
}: PlateElementProps<Paragraph>) => {
  const element = _element as Paragraph;
  const elementToAttributes = _elementToAttributes as PlateElementProps['elementToAttributes'];

  return (
    <PlateElement {...props} element={element} elementToAttributes={elementToAttributes} as="p">
      {children}
    </PlateElement>
  );
};

const ParagraphPlugin = createPlatePlugin({ key: 'paragraph', node: { isElement: true, isVoid: false, component: ParagraphElement } });

const plugins = [
  ParagraphPlugin,
  // Comment out this to make useEditorSelection to work again
  YjsPlugin.configure({ options: { hocuspocusProviderOptions: { url: 'http://localhost:1234', name: 'test' } } }),
];

const App = () => {
  const editor = createPlateEditor({ plugins: plugins });

  return (
    <Plate editor={editor}>
      <Selection />
      <PlateContent placeholder="Type..." style={{ width: 200, height: 200, border: '1px solid black' }} />
    </Plate>
  );
};

const Selection = () => {
  // Returns null with YjsPlugin enabled
  const selection1 = useEditorSelectionFromPlate();
  const selection2 = useEditorSelectionFromPlateCore();

  console.log('useEditorSelection() from @udecode/plate/react:', selection1);
  console.log('useEditorSelection() from @udecode/plate-core/react:', selection2);

  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
