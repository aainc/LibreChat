import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSharedMessages } from 'librechat-data-provider/react-query';
import { useLocalize, useDocumentTitle } from '~/hooks';
import { useGetStartupConfig } from '~/data-provider';
import { ShareContext } from '~/Providers';
import { Spinner } from '~/components/svg';
import MessagesView from './MessagesView';
import { buildTree } from '~/utils';
import Footer from '../Chat/Footer';
import { useRecoilValue } from 'recoil';
import { DragDropWrapper } from '~/components/Chat/Input/Files';
import { SidePanelGroup } from '~/components/SidePanel';
import { EditorProvider } from '~/Providers';
import Artifacts from '~/components/Artifacts/Artifacts';
import store from '~/store';
import { Files } from '~/components/Chat/Input/Files';

function SharedView() {
  const localize = useLocalize();
  const { data: config } = useGetStartupConfig();
  const { shareId } = useParams();
  const { data, isLoading } = useGetSharedMessages(shareId ?? '');
  const dataTree = data && buildTree({ messages: data.messages });
  const messagesTree = dataTree?.length === 0 ? null : dataTree ?? null;
  const artifacts = useRecoilValue(store.artifactsState);
  const artifactsVisible = useRecoilValue(store.artifactsVisible);

  // configure document title
  let docTitle = '';
  if (config?.appTitle != null && data?.title != null) {
    docTitle = `${data.title} | ${config.appTitle}`;
  } else {
    docTitle = data?.title ?? config?.appTitle ?? document.title;
  }

  useDocumentTitle(docTitle);

  const defaultLayout = useMemo(() => {
    const resizableLayout = localStorage.getItem('react-resizable-panels:layout');
    return typeof resizableLayout === 'string' ? JSON.parse(resizableLayout) : undefined;
  }, []);

  let content: JSX.Element;
  if (isLoading) {
    content = (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="" />
      </div>
    );
  } else if (data && messagesTree && messagesTree.length !== 0) {
    content = (
      <>
        <div className="final-completion group mx-auto flex min-w-[40rem] flex-col gap-3 pb-6 pt-4 md:max-w-3xl md:px-5 lg:max-w-[40rem] lg:px-1 xl:max-w-[48rem] xl:px-5">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <div className="border-b border-border-medium pb-6 text-base text-text-secondary">
            {new Date(data.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>

        <MessagesView messagesTree={messagesTree} conversationId={data.conversationId} />
      </>
    );
  } else {
    content = (
      <div className="flex h-screen items-center justify-center ">
        {localize('com_ui_shared_link_not_found')}
      </div>
    );
  }

  return (
    <ShareContext.Provider value={{ isSharedConvo: true }}>
      <DragDropWrapper className="relative flex w-full grow overflow-hidden bg-presentation">
        <SidePanelGroup
          defaultLayout={defaultLayout}
          artifacts={
            artifactsVisible === true && Object.keys(artifacts ?? {}).length > 0 ? (
              <EditorProvider>
                <Artifacts />
              </EditorProvider>
            ) : null
          }
        >
          <main className="flex h-full flex-col overflow-y-auto" role="main">
            {content}
            <div className="w-full border-t-0 pl-0 pt-2 md:w-[calc(100%-.5rem)] md:border-t-0 md:border-transparent md:pl-0 md:pt-0 md:dark:border-transparent">
              <Footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-gradient-to-t from-surface-secondary to-transparent px-2 pb-2 pt-8 text-xs text-text-secondary md:px-[60px]" />
            </div>
          </main>
        </SidePanelGroup>
      </DragDropWrapper>
    </ShareContext.Provider>
  );
}

export default memo(SharedView);
