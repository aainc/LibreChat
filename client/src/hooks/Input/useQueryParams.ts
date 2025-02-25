import { useEffect, useCallback, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  QueryKeys,
  EModelEndpoint,
  isAgentsEndpoint,
  tQueryParamsSchema,
  isAssistantsEndpoint,
} from 'librechat-data-provider';
import type { TPreset, TEndpointsConfig } from 'librechat-data-provider';
import type { ZodAny } from 'zod';
import { getConvoSwitchLogic, removeUnavailableTools } from '~/utils';
import useDefaultConvo from '~/hooks/Conversations/useDefaultConvo';
import { useChatContext, useChatFormContext } from '~/Providers';
import store from '~/store';

const parseQueryValue = (value: string) => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (!isNaN(Number(value))) {
    return Number(value);
  }
  return value;
};

const processValidSettings = (queryParams: Record<string, string>) => {
  const validSettings = {} as TPreset;

  Object.entries(queryParams).forEach(([key, value]) => {
    try {
      const schema = tQueryParamsSchema.shape[key] as ZodAny | undefined;
      if (schema) {
        const parsedValue = parseQueryValue(value);
        const validValue = schema.parse(parsedValue);
        validSettings[key] = validValue;
      }
    } catch (error) {
      console.warn(`Invalid value for setting ${key}:`, error);
    }
  });

  if (
    validSettings.assistant_id != null &&
    validSettings.assistant_id &&
    !isAssistantsEndpoint(validSettings.endpoint)
  ) {
    validSettings.endpoint = EModelEndpoint.assistants;
  }
  if (
    validSettings.agent_id != null &&
    validSettings.agent_id &&
    !isAgentsEndpoint(validSettings.endpoint)
  ) {
    validSettings.endpoint = EModelEndpoint.agents;
  }

  return validSettings;
};

export default function useQueryParams({
  textAreaRef,
}: {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}) {
  const [searchParams] = useSearchParams();
  const methods = useChatFormContext();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    try {
      const prompt = searchParams.get('prompt');
      
      // プロンプトが存在しない場合は早期リターン
      if (!prompt) {
        return;
      }

      // テキストエリアの参照が存在しない場合は早期リターン
      if (!textAreaRef.current) {
        return;
      }

      // テキストエリアの値を安全に設定
      methods.setValue('text', prompt, { shouldValidate: true });
      
      // 前回のタイムアウトをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // フォーカスとカーソル位置の設定を遅延させる
      timeoutRef.current = setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
          textAreaRef.current.setSelectionRange(prompt.length, prompt.length);
        }
      }, 100);

      // URLからクエリパラメータを削除
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    } catch (error) {
      console.error('Error in useQueryParams:', error);
    }

    // クリーンアップ関数
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchParams, methods, textAreaRef]);
}
