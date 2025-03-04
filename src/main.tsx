import type { TElement } from '@udecode/plate';
import {
  createPlateEditor,
  createPlatePlugin,
  useEditorSelection as useEditorSelectionFromPlateCore,
} from '@udecode/plate-core/react';
import { YjsPlugin } from '@udecode/plate-yjs/react';
import {
  Plate,
  PlateContent,
  PlateElement,
  type PlateElementProps,
  useEditorSelection as useEditorSelectionFromPlate,
} from '@udecode/plate/react';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface Paragraph extends TElement {
  type: 'paragraph';
  children: { text: string }[];
}

const ParagraphElement = ({ children, element: _element, ...props }: PlateElementProps<Paragraph>) => {
  const element = _element as Paragraph;

  return (
    <PlateElement {...props} element={element} as="p">
      {children}
    </PlateElement>
  );
};

const ParagraphPlugin = createPlatePlugin({
  key: 'paragraph',
  node: { isElement: true, isVoid: false, component: ParagraphElement },
});

// Set to false to make useEditorSelection to work again
const enableYjs = true;

const plugins = enableYjs
  ? [
      ParagraphPlugin,
      YjsPlugin.configure({
        options: { providers: [{ type: 'hocuspocus', options: { url: 'http://localhost:1234', name: 'test' } }] },
      }),
    ]
  : [ParagraphPlugin];

const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

const App = () => {
  const editor = createPlateEditor({ plugins: plugins, skipInitialization: enableYjs });
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted || !enableYjs) {
      return;
    }

    editor.getApi(YjsPlugin).yjs.init({ id: '1234' });

    return editor.getApi(YjsPlugin).yjs.destroy
  });

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
