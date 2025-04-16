import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useGetSharedMessages } from 'librechat-data-provider/react-query';
import { useLocalize, useDocumentTitle } from '~/hooks';
import { useGetStartupConfig } from '~/data-provider';
import { ShareContext, EditorProvider } from '~/Providers';
import { Spinner } from '~/components/svg';
import MessagesView from './MessagesView';
import Artifacts from '~/components/Artifacts/Artifacts';
import { SidePanelGroup } from '~/components/SidePanel';
import { buildTree } from '~/utils';
import Footer from '../Chat/Footer';
import store from '~/store';

function SharedView() {
  const localize = useLocalize();
  const { data: config } = useGetStartupConfig();
  const { shareId } = useParams();
  const { data, isLoading } = useGetSharedMessages(shareId ?? '');
  const dataTree = data && buildTree({ messages: data.messages });
  const messagesTree = dataTree?.length === 0 ? null : dataTree ?? null;
  
  // アーティファクト関連の状態を取得
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

  // SidePanelGroup用の設定を取得
  const defaultLayout = useMemo(() => {
    const resizableLayout = localStorage.getItem('react-resizable-panels:layout');
    return typeof resizableLayout === 'string' ? JSON.parse(resizableLayout) : undefined;
  }, []);
  
  const defaultCollapsed = useMemo(() => {
    const collapsedPanels = localStorage.getItem('react-resizable-panels:collapsed');
    return typeof collapsedPanels === 'string' ? JSON.parse(collapsedPanels) : true;
  }, []);
  
  const fullPanelCollapse = useMemo(() => localStorage.getItem('fullPanelCollapse') === 'true', []);

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

  // artifactsパネル専用のラッパー
  const artifactsPanel = artifactsVisible === true && Object.keys(artifacts ?? {}).length > 0 ? (
    <div className="flex h-full max-h-screen flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <EditorProvider>
          <Artifacts />
        </EditorProvider>
      </div>
    </div>
  ) : null;

  return (
    <ShareContext.Provider value={{ isSharedConvo: true }}>
      <main
        className="relative flex h-screen w-full flex-col overflow-hidden dark:bg-surface-secondary"
        style={{ paddingBottom: '50px' }}
      >
        <div className="flex-1 overflow-hidden">
          <SidePanelGroup
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            fullPanelCollapse={fullPanelCollapse}
            artifacts={artifactsPanel}
          >
            <div className="flex h-full flex-col overflow-auto">
              <div className="flex-1 overflow-auto">
                {content}
              </div>
              <div className="w-full border-t-0 pl-0 pt-2 md:w-[calc(100%-.5rem)] md:border-t-0 md:border-transparent md:pl-0 md:pt-0 md:dark:border-transparent">
                <Footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-gradient-to-t from-surface-secondary to-transparent px-2 pb-2 pt-8 text-xs text-text-secondary md:px-[60px]" />
              </div>
            </div>
          </SidePanelGroup>
        </div>
      </main>
    </ShareContext.Provider>
  );
}

export default memo(SharedView);
