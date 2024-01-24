import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useGetStartupConfig } from 'librechat-data-provider/react-query';
import LightningIcon from '~/components/svg/LightningIcon';
import useDocumentTitle from '~/hooks/useDocumentTitle';
import CautionIcon from '~/components/svg/CautionIcon';
import SunIcon from '~/components/svg/SunIcon';
import { useLocalize } from '~/hooks';
import store from '~/store';

export default function Landing() {
  const { data: config } = useGetStartupConfig();
  const setText = useSetRecoilState(store.text);
  const conversation = useRecoilValue(store.conversation);
  const localize = useLocalize();
  const { title = localize('com_ui_new_chat') } = conversation ?? {};

  useDocumentTitle(title);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const promptText = e.currentTarget.getAttribute('data-prompt') || '';
    setText(promptText);
  };

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto pt-0 text-sm dark:bg-gray-800">
      <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
        <h1
          id="landing-title"
          data-testid="landing-title"
          className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]"
        >
          {config?.appTitle || 'LibreChat'}
        </h1>
        <div className="items-start gap-3.5 text-center md:flex">
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <SunIcon />
              {localize('com_ui_examples')}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
                data-prompt={localize('aa_prompt_body1')}
              >
                &quot;{localize('aa_prompt_title1')}&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
                data-prompt={localize('aa_prompt_body2')}
              >
                &quot;{localize('aa_prompt_title2')}&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
                data-prompt={localize('aa_prompt_body3')}
              >
                &quot;{localize('aa_prompt_title3')}&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
                data-prompt={localize('aa_prompt_body4')}
              >
                &quot;{localize('aa_prompt_title4')}&quot; →
              </button>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <SunIcon />
              {localize('com_ui_examples')}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
                data-prompt={localize('aa_prompt_body5')}
              >
                &quot;{localize('aa_prompt_title5')}&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
                data-prompt={localize('aa_prompt_body6')}
              >
                &quot;{localize('aa_prompt_title6')}&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
                data-prompt={localize('aa_prompt_body7')}
              >
                &quot;{localize('aa_prompt_title7')}&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
                data-prompt={localize('aa_prompt_body8')}
              >
                &quot;{localize('aa_prompt_title8')}&quot; →
              </button>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <CautionIcon />
              その他諸々
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className='w-full rounded-md bg-gray-50 p-3 dark:bg-white/5'>
                <a target="_blank" href="https://docs.google.com/document/d/1hK2OfmeH7WQaxqAl4k0C3DaIzY4ty9IPsXitzn_YS0M/edit#heading=h.llh54218s6o9" rel="noreferrer">ChatGPT利用ルール→</a>
              </li>
              <li className='w-full rounded-md bg-gray-50 p-3 dark:bg-white/5'>
                <a target="_blank" href="https://docs.google.com/document/d/1aBUh99fuzN2cTDSK7UQYucwlWtvs5M7yq5EmKLPp9nw/edit" rel="noreferrer">もっと色々見たい人へ→</a>
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                <ul className='items-start'>
                  <li>欲しい回答が出ない時入れてほしいもの-①前提条件</li>
                  <ul>
                    <li>■相談事項の背景情報や目的</li>
                    <li>■どんな立場や観点から回答して欲しいのか</li>
                  </ul>
                </ul>
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                <ul className='items-start'>
                  <li>欲しい回答が出ない時入れてほしいもの-②言葉の定義</li>
                  <ul>
                    <li>■ロイヤル積極層は「継続意向8点以上、継続回数3回以上」とします</li>
                    <li>■予算は「国内上場企業の広告費」とします</li>
                  </ul>
                </ul>
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                <ul className='items-start'>
                  <li>欲しい回答が出ない時入れてほしいもの-③成果物の明示</li>
                  <ul>
                    <li>■欲しいアドバイスや制作物の具体的な形（フォーマット、数）</li>
                    <li>■成果物の具体例（例示して示すと精度が上がる）</li>
                  </ul>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        {/* {!showingTemplates && (
          <div className="mt-8 mb-4 flex flex-col items-center gap-3.5 md:mt-16">
            <button
              onClick={showTemplates}
              className="btn btn-neutral justify-center gap-2 border-0 md:border"
            >
              <ChatIcon />
              Show Prompt Templates
            </button>
          </div>
        )}
        {!!showingTemplates && <Templates showTemplates={showTemplates}/>} */}
        {/* <div className="group h-32 w-full flex-shrink-0 dark:border-gray-900/50 dark:bg-gray-800 md:h-48" /> */}
      </div>
    </div>
  );
}
