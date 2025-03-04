import { Server } from '@hocuspocus/server';
import { slateNodesToInsertDelta } from '@slate-yjs/core';
import { applyUpdateV2 } from 'yjs';
import * as Y from 'yjs';

const server = new Server({
  port: 1234,
  name: 'test',
  async onLoadDocument() {
    const content = [
      {
        type: 'paragraph',
        children: [{ text: 'test' }],
      },
    ];

    const doc = new Y.Doc();
    const xmlText = doc.get('content', Y.XmlText);
    const insertDelta = slateNodesToInsertDelta(content);
    xmlText.applyDelta(insertDelta);
    const state = Y.encodeStateAsUpdateV2(doc);
    const data = Buffer.from(state).toString('base64');
    const update = new Uint8Array(Buffer.from(data, 'base64url'));

    applyUpdateV2(doc, update);

    return doc;
  },
});

server.listen();
