import { memo, useState, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Spinner } from '@librechat/client';
import { useParams } from 'react-router-dom';
import { buildTree } from 'librechat-data-provider';
import { useGetSharedMessages } from 'librechat-data-provider/react-query';
import { useLocalize, useDocumentTitle } from '~/hooks';
import { useGetStartupConfig } from '~/data-provider';
import { ShareContext, SidePanelProvider, EditorProvider, ChatContext } from '~/Providers';
import { ArtifactProvider } from '~/Providers/ArtifactContext';
import { ArtifactsProvider } from '~/Providers/ArtifactsContext';
import { SidePanelGroup } from '~/components/SidePanel';
import Artifacts from '~/components/Artifacts/Artifacts';
import MessagesView from './MessagesView';
import Footer from '../Chat/Footer';
import store from '~/store';

function SharedView() {
  const localize = useLocalize();
  const { data: config } = useGetStartupConfig();
  const { shareId } = useParams();
  const { data, isLoading } = useGetSharedMessages(shareId ?? '');
  const dataTree = data && buildTree({ messages: data.messages });
  const messagesTree = dataTree?.length === 0 ? null : (dataTree ?? null);

  // Artifacts state - detect if messages contain artifacts
  const artifacts = useRecoilValue(store.artifactsState);
  const artifactsVisibility = useRecoilValue(store.artifactsVisibility);
  const setArtifacts = useSetRecoilState(store.artifactsState);
  const setCurrentArtifactId = useSetRecoilState(store.currentArtifactId);

  // Check if messages contain artifacts
  const hasArtifacts = useMemo(() => {
    if (!messagesTree) return false;
    return messagesTree.some(msg => {
      const text = msg.text || '';
      const content = msg.content?.[0]?.text || '';
      // More comprehensive artifact detection
      return text.includes('<artifact') ||
             content.includes('<artifact') ||
             text.includes('Click to open') ||
             content.includes('Click to open') ||
             (msg.content && Array.isArray(msg.content) && msg.content.some(c =>
               c.text?.includes('<artifact') || c.text?.includes('Click to open')
             ));
    });
  }, [messagesTree]);

  // Force artifacts visibility for shared views with artifacts
  const [localArtifactsVisible, setLocalArtifactsVisible] = useState(false);

  useEffect(() => {
    if (hasArtifacts) {
      setLocalArtifactsVisible(true);
    }
  }, [hasArtifacts]);

  // Initialize artifacts state from shared messages
  useEffect(() => {
    if (data?.messages) {
      console.log('Debug: Shared message data:', data.messages);

      const extractedArtifacts = {};
      let foundArtifactId = null;

      // Extract artifacts from messages
      data.messages.forEach((msg, index) => {
        console.log(`Debug: Message ${index}:`, {
          text: msg.text?.substring(0, 200),
          content: msg.content,
          hasArtifact: msg.text?.includes('<artifact') || (msg.content && JSON.stringify(msg.content).includes('<artifact'))
        });

        const text = msg.text || '';
        const contentString = Array.isArray(msg.content) ? msg.content.map(c => c.text).join('') : '';
        const fullText = text + contentString;

        // Try to match :::artifact{...} format
        const artifactMatch = fullText.match(/:::artifact\{identifier="([^"]*)"[^}]*\}\s*```\s*(.*?)\s*```\s*:::/s);

        if (artifactMatch) {
          const [, identifier, content] = artifactMatch;
          const artifactId = `artifact_${identifier}`;

          console.log('Debug: Found artifact:', { identifier, artifactId, content: content.substring(0, 200) });

          extractedArtifacts[artifactId] = {
            identifier,
            type: 'image/svg+xml',
            title: '簡単な風景図',
            content: content.trim(),
            lastUpdateTime: Date.now(),
          };

          foundArtifactId = artifactId;
        }
      });

      // Set all artifacts at once to avoid multiple re-renders
      if (Object.keys(extractedArtifacts).length > 0) {
        setArtifacts(extractedArtifacts);
        if (foundArtifactId) {
          setCurrentArtifactId(foundArtifactId);
        }
      }
    }
  }, [data?.messages, setArtifacts, setCurrentArtifactId]);

  // configure document title
  let docTitle = '';
  if (config?.appTitle != null && data?.title != null) {
    docTitle = `${data.title} | ${config.appTitle}`;
  } else {
    docTitle = data?.title ?? config?.appTitle ?? document.title;
  }

  useDocumentTitle(docTitle);

  // Mock ChatContext for ArtifactsProvider in shared views
  const mockChatContext = useMemo(() => ({
    isSubmitting: false,
    latestMessage: null,
    conversation: data ? { conversationId: data.conversationId } : null,
    // Add other properties that might be needed
    messages: data?.messages || [],
    setMessages: () => {},
    askAssistant: () => {},
    regenerateMessage: () => {},
    continueMessage: () => {},
    handleStopGenerating: () => {},
  }), [data?.conversationId, data?.messages]);

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
        <div className="final-completion group mx-auto flex min-w-[40rem] flex-col gap-3 pb-6 pt-4 md:max-w-[47rem] md:px-5 lg:px-1 xl:max-w-[55rem] xl:px-5">
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
      <div className="flex h-screen items-center justify-center">
        {localize('com_ui_shared_link_not_found')}
      </div>
    );
  }

  return (
    <ShareContext.Provider value={{ isSharedConvo: true }}>
      <SidePanelProvider>
        <SidePanelGroup
          artifacts={
            <ChatContext.Provider value={mockChatContext}>
              <ArtifactsProvider>
                <ArtifactProvider>
                  <EditorProvider>
                    <Artifacts />
                  </EditorProvider>
                </ArtifactProvider>
              </ArtifactsProvider>
            </ChatContext.Provider>
          }
        >
          <main className="flex h-full flex-col overflow-y-auto" role="main">
            <div className="transition-width relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden pt-0 dark:bg-surface-secondary">
              <div className="flex h-full flex-col text-text-primary" role="presentation">
                {content}
                <div className="w-full border-t-0 pl-0 pt-2 md:w-[calc(100%-.5rem)] md:border-t-0 md:border-transparent md:pl-0 md:pt-0 md:dark:border-transparent">
                  <Footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-gradient-to-t from-surface-secondary to-transparent px-2 pb-2 pt-8 text-xs text-text-secondary md:px-[60px]" />
                </div>
              </div>
            </div>
          </main>
        </SidePanelGroup>
      </SidePanelProvider>
    </ShareContext.Provider>
  );
}

export default memo(SharedView);
