// English phrases
// file deepcode ignore NoHardcodedPasswords: No hardcoded values present in this file
// file deepcode ignore HardcodedNonCryptoSecret: No hardcoded secrets present in this file

export default {
  com_ui_enter_api_key: 'Enter API Key',
  com_ui_librechat_code_api_title: 'Run AI Code',
  com_ui_librechat_code_api_subtitle: 'Secure. Multi-language. Input/Output Files.',
  com_ui_librechat_code_api_key: 'Get your LibreChat Code Interpreter API key',
  com_nav_convo_menu_options: 'Conversation Menu Options',
  com_ui_artifacts: 'Artifacts',
  com_ui_artifacts_toggle: 'Toggle Artifacts UI',
  com_nav_info_code_artifacts:
    'Enables the display of experimental code artifacts next to the chat',
  com_ui_include_shadcnui: 'Include shadcn/ui components instructions',
  com_nav_info_include_shadcnui:
    'When enabled, instructions for using shadcn/ui components will be included. shadcn/ui is a collection of re-usable components built using Radix UI and Tailwind CSS. Note: these are lengthy instructions, you should only enable if informing the LLM of the correct imports and components is important to you. For more information about these components, visit: https://ui.shadcn.com/',
  com_ui_custom_prompt_mode: 'Custom Prompt Mode',
  com_nav_info_custom_prompt_mode:
    'When enabled, the default artifacts system prompt will not be included. All artifact-generating instructions must be provided manually in this mode.',
  com_ui_artifact_click: 'Click to open',
  com_a11y_start: 'The AI has started their reply.',
  com_a11y_ai_composing: 'The AI is still composing.',
  com_a11y_end: 'The AI has finished their reply.',
  com_error_moderation:
    'It appears that the content submitted has been flagged by our moderation system for not aligning with our community guidelines. We\'re unable to proceed with this specific topic. If you have any other questions or topics you\'d like to explore, please edit your message, or create a new conversation.',
  com_error_no_user_key: 'No key found. Please provide a key and try again.',
  com_error_no_base_url: 'No base URL found. Please provide one and try again.',
  com_warning_resubmit_unsupported:
    'Resubmitting the AI message is not supported for this endpoint.',
  com_error_invalid_request_error:
    'The AI service rejected the request due to an error. This could be caused by an invalid API key or an improperly formatted request.',
  com_error_invalid_action_error: 'Request denied: The specified action domain is not allowed.',
  com_error_no_system_messages:
    'The selected AI service or model does not support system messages. Try using prompts instead of custom instructions.',
  com_error_invalid_user_key: 'Invalid key provided. Please provide a valid key and try again.',
  com_error_expired_user_key:
    'Provided key for {0} expired at {1}. Please provide a new key and try again.',
  com_error_input_length:
    'The latest message token count is too long, exceeding the token limit ({0} respectively). Please shorten your message, adjust the max context size from the conversation parameters, or fork the conversation to continue.',
  com_error_files_empty: 'Empty files are not allowed.',
  com_error_files_dupe: 'Duplicate file detected.',
  com_error_files_validation: 'An error occurred while validating the file.',
  com_error_files_process: 'An error occurred while processing the file.',
  com_error_files_upload: 'An error occurred while uploading the file.',
  com_error_files_upload_canceled:
    'The file upload request was canceled. Note: the file upload may still be processing and will need to be manually deleted.',
  com_files_no_results: 'No results.',
  com_files_filter: 'Filter files...',
  com_generated_files: 'Generated files:',
  com_download_expired: '(download expired)',
  com_download_expires: '(click here to download - expires {0})',
  com_click_to_download: '(click here to download)',
  com_files_number_selected: '{0} of {1} file(s) selected',
  com_sidepanel_select_assistant: 'Select an Assistant',
  com_sidepanel_parameters: 'Parameters',
  com_sidepanel_assistant_builder: 'Assistant Builder',
  com_sidepanel_hide_panel: 'Hide Panel',
  com_sidepanel_attach_files: 'Attach Files',
  com_sidepanel_manage_files: 'Manage Files',
  com_sidepanel_conversation_tags: 'Bookmarks',
  com_assistants_capabilities: 'Capabilities',
  com_assistants_file_search: 'File Search',
  com_assistants_file_search_info:
    'File search enables the assistant with knowledge from files that you or your users upload. Once a file is uploaded, the assistant automatically decides when to retrieve content based on user requests. Attaching vector stores for File Search is not yet supported. You can attach them from the Provider Playground or attach files to messages for file search on a thread basis.',
  com_assistants_code_interpreter_info:
    'Code Interpreter enables the assistant to write and run code. This tool can process files with diverse data and formatting, and generate files such as graphs.',
  com_assistants_knowledge: 'Knowledge',
  com_assistants_knowledge_info:
    'If you upload files under Knowledge, conversations with your Assistant may include file contents.',
  com_assistants_knowledge_disabled:
    'Assistant must be created, and Code Interpreter or Retrieval must be enabled and saved before uploading files as Knowledge.',
  com_assistants_image_vision: 'Image Vision',
  com_assistants_code_interpreter: 'Code Interpreter',
  com_assistants_code_interpreter_files: 'Files below are for Code Interpreter only:',
  com_assistants_retrieval: 'Retrieval',
  com_assistants_search_name: 'Search assistants by name',
  com_ui_tools: 'Tools',
  com_assistants_actions: 'Actions',
  com_assistants_add_tools: 'Add Tools',
  com_assistants_add_actions: 'Add Actions',
  com_assistants_non_retrieval_model:
    'File search is not enabled on this model. Please select another model.',
  com_assistants_available_actions: 'Available Actions',
  com_assistants_running_action: 'Running action',
  com_assistants_completed_action: 'Talked to {0}',
  com_assistants_completed_function: 'Ran {0}',
  com_assistants_function_use: 'Assistant used {0}',
  com_assistants_domain_info: 'Assistant sent this info to {0}',
  com_assistants_delete_actions_success: 'Successfully deleted Action from Assistant',
  com_assistants_update_actions_success: 'Successfully created or updated Action',
  com_assistants_update_actions_error: 'There was an error creating or updating the action.',
  com_assistants_delete_actions_error: 'There was an error deleting the action.',
  com_assistants_actions_info: 'Let your Assistant retrieve information or take actions via API\'s',
  com_assistants_name_placeholder: 'Optional: The name of the assistant',
  com_assistants_instructions_placeholder: 'The system instructions that the assistant uses',
  com_assistants_description_placeholder: 'Optional: Describe your Assistant here',
  com_assistants_actions_disabled: 'You need to create an assistant before adding actions.',
  com_assistants_update_success: 'Successfully updated',
  com_assistants_update_error: 'There was an error updating your assistant.',
  com_assistants_create_success: 'Successfully created',
  com_assistants_create_error: 'There was an error creating your assistant.',
  com_assistants_conversation_starters: 'Conversation Starters',
  com_assistants_conversation_starters_placeholder: 'Enter a conversation starter',
  com_sidepanel_agent_builder: 'Agent Builder',
  com_agents_name_placeholder: 'Optional: The name of the agent',
  com_agents_description_placeholder: 'Optional: Describe your Agent here',
  com_agents_instructions_placeholder: 'The system instructions that the agent uses',
  com_agents_search_name: 'Search agents by name',
  com_sidepanel_select_agent: 'Select an Agent',
  com_agents_update_error: 'There was an error updating your agent.',
  com_agents_create_error: 'There was an error creating your agent.',
  com_agents_missing_provider_model: 'Please select a provider and model before creating an agent.',
  com_agents_allow_editing: 'Allow other users to edit your agent',
  com_agents_not_available: 'Agent Not Available',
  com_agents_no_access: 'You don\'t have access to edit this agent.',
  com_agents_enable_file_search: 'Enable File Search',
  com_agents_file_search_info:
    'When enabled, the agent will be informed of the exact filenames listed below, allowing it to retrieve relevant context from these files.',
  com_agents_code_interpreter_title: 'Code Interpreter API',
  com_agents_by_librechat: 'by LibreChat',
  com_agents_code_interpreter:
    'When enabled, allows your agent to leverage the LibreChat Code Interpreter API to run generated code, including file processing, securely. Requires a valid API key.',
  com_agents_file_search_disabled: 'Agent must be created before uploading files for File Search.',
  com_ui_agent_already_shared_to_all: 'This agent is already shared to all users',
  com_ui_agent_editing_allowed: 'Other users can already edit this agent',
  com_ui_no_changes: 'No changes to update',
  com_ui_date_today: 'Today',
  com_ui_date_yesterday: 'Yesterday',
  com_ui_date_previous_7_days: 'Previous 7 days',
  com_ui_date_previous_30_days: 'Previous 30 days',
  com_ui_date_january: 'January',
  com_ui_date_february: 'February',
  com_ui_date_march: 'March',
  com_ui_date_april: 'April',
  com_ui_date_may: 'May',
  com_ui_date_june: 'June',
  com_ui_date_july: 'July',
  com_ui_date_august: 'August',
  com_ui_date_september: 'September',
  com_ui_date_october: 'October',
  com_ui_date_november: 'November',
  com_ui_date_december: 'December',
  com_ui_field_required: 'This field is required',
  com_ui_download_error: 'Error downloading file. The file may have been deleted.',
  com_ui_attach_error_type: 'Unsupported file type for endpoint:',
  com_ui_attach_error_openai: 'Cannot attach Assistant files to other endpoints',
  com_ui_attach_warn_endpoint: 'Non-Assistant files may be ignored without a compatible tool',
  com_ui_attach_error_size: 'File size limit exceeded for endpoint:',
  com_ui_attach_error:
    'Cannot attach file. Create or select a conversation, or try refreshing the page.',
  com_ui_examples: 'Examples',
  com_ui_new_chat: 'New chat',
  com_ui_happy_birthday: 'It\'s my 1st birthday!',
  com_ui_experimental: 'Experimental Features',
  com_ui_on: 'On',
  com_ui_off: 'Off',
  com_ui_yes: 'Yes',
  com_ui_no: 'No',
  com_ui_ascending: 'Asc',
  com_ui_descending: 'Desc',
  com_ui_show_all: 'Show All',
  com_ui_name: 'Name',
  com_ui_date: 'Date',
  com_ui_storage: 'Storage',
  com_ui_context: 'Context',
  com_ui_size: 'Size',
  com_ui_host: 'Host',
  com_ui_update: 'Update',
  com_ui_authentication: 'Authentication',
  com_ui_instructions: 'Instructions',
  com_ui_description: 'Description',
  com_ui_error: 'Error',
  com_ui_error_connection: 'Error connecting to server, try refreshing the page.',
  com_ui_select: 'Select',
  com_ui_input: 'Input',
  com_ui_close: 'Close',
  com_ui_endpoint: 'Endpoint',
  com_ui_endpoint_menu: 'LLM Endpoint Menu',
  com_ui_endpoints_available: 'Available Endpoints',
  com_ui_export_convo_modal: 'Export Conversation Modal',
  com_ui_llms_available: 'Available LLMs',
  com_ui_llm_menu: 'LLM Menu',
  com_ui_provider: 'Provider',
  com_ui_model: 'Model',
  com_ui_region: 'Region',
  com_ui_reset_var: 'Reset {0}',
  com_ui_model_parameters: 'Model Parameters',
  com_ui_model_save_success: 'Model parameters saved successfully',
  com_ui_select_model: 'Select a model',
  com_ui_select_region: 'Select a region',
  com_ui_select_provider: 'Select a provider',
  com_ui_select_provider_first: 'Select a provider first',
  com_ui_select_search_model: 'Search model by name',
  com_ui_select_search_provider: 'Search provider by name',
  com_ui_select_search_region: 'Search region by name',
  com_ui_select_search_plugin: 'Search plugin by name',
  com_ui_use_prompt: 'Use prompt',
  com_ui_prev: 'Prev',
  com_ui_next: 'Next',
  com_ui_stop: 'Stop',
  com_ui_upload_files: 'Upload files',
  com_ui_upload_image_input: 'Upload Image',
  com_ui_upload_file_search: 'Upload for File Search',
  com_ui_upload_code_files: 'Upload for Code Interpreter',
  com_ui_prompt: 'Prompt',
  com_ui_prompts: 'Prompts',
  com_ui_prompt_name: 'Prompt Name',
  com_ui_delete_prompt: 'Delete Prompt?',
  com_ui_admin: 'Admin',
  com_ui_simple: 'Simple',
  com_ui_versions: 'Versions',
  com_ui_version_var: 'Version {0}',
  com_ui_advanced: 'Advanced',
  com_ui_admin_settings: 'Admin Settings',
  com_ui_error_save_admin_settings: 'There was an error saving your admin settings.',
  com_ui_prompt_preview_not_shared: 'The author has not allowed collaboration for this prompt.',
  com_ui_prompt_name_required: 'Prompt Name is required',
  com_ui_prompt_text_required: 'Text is required',
  com_ui_prompt_text: 'Text',
  com_ui_back_to_chat: 'Back to Chat',
  com_ui_back_to_prompts: 'Back to Prompts',
  com_ui_categories: 'Categories',
  com_ui_filter_prompts_name: 'Filter prompts by name',
  com_ui_search_categories: 'Search Categories',
  com_ui_manage: 'Manage',
  com_ui_variables: 'Variables',
  com_ui_variables_info:
    'Use double braces in your text to create variables, e.g. `{{example variable}}`, to later fill when using the prompt.',
  com_ui_special_variables: 'Special variables:',
  com_ui_special_variables_info:
    'Use `{{current_date}}` for the current date, and `{{current_user}}` for your given account name.',
  com_ui_dropdown_variables: 'Dropdown variables:',
  com_ui_dropdown_variables_info:
    'Create custom dropdown menus for your prompts: `{{variable_name:option1|option2|option3}}`',
  com_ui_showing: 'Showing',
  com_ui_of: 'of',
  com_ui_entries: 'Entries',
  com_ui_pay_per_call: 'All AI conversations in one place. Pay per call and not per month',
  com_ui_new_footer: 'All AI conversations in one place.',
  com_ui_latest_footer: 'Every AI for Everyone.',
  com_ui_enter: 'Enter',
  com_ui_submit: 'Submit',
  com_ui_zoom: 'Zoom',
  com_ui_none_selected: 'None selected',
  com_ui_upload_success: 'Successfully uploaded file',
  com_ui_upload_error: 'There was an error uploading your file',
  com_ui_upload_invalid: 'Invalid file for upload. Must be an image not exceeding the limit',
  com_ui_upload_invalid_var: 'Invalid file for upload. Must be an image not exceeding {0} MB',
  com_ui_cancel: 'Cancel',
  com_ui_save: 'Save',
  com_ui_renaming_var: 'Renaming "{0}"',
  com_ui_save_submit: 'Save & Submit',
  com_user_message: 'You',
  com_ui_read_aloud: 'Read aloud',
  com_ui_copied: 'Copied!',
  com_ui_copy_code: 'Copy code',
  com_ui_run_code: 'Run Code',
  com_ui_run_code_error: 'There was an error running the code',
  com_ui_copy_to_clipboard: 'Copy to clipboard',
  com_ui_copied_to_clipboard: 'Copied to clipboard',
  com_ui_fork: 'Fork',
  com_ui_fork_info_1: 'Use this setting to fork messages with the desired behavior.',
  com_ui_fork_info_2:
    '"Forking" refers to creating a new conversation that start/end from specific messages in the current conversation, creating a copy according to the options selected.',
  com_ui_fork_info_3:
    'The "target message" refers to either the message this popup was opened from, or, if you check "{0}", the latest message in the conversation.',
  com_ui_fork_info_visible:
    'This option forks only the visible messages; in other words, the direct path to the target message, without any branches.',
  com_ui_fork_info_branches:
    'This option forks the visible messages, along with related branches; in other words, the direct path to the target message, including branches along the path.',
  com_ui_fork_info_target:
    'This option forks all messages leading up to the target message, including its neighbors; in other words, all message branches, whether or not they are visible or along the same path, are included.',
  com_ui_fork_info_start:
    'If checked, forking will commence from this message to the latest message in the conversation, according to the behavior selected above.',
  com_ui_fork_info_remember:
    'Check this to remember the options you select for future usage, making it quicker to fork conversations as preferred.',
  com_ui_fork_success: 'Successfully forked conversation',
  com_ui_fork_processing: 'Forking conversation...',
  com_ui_fork_error: 'There was an error forking the conversation',
  com_ui_fork_change_default: 'Default fork option',
  com_ui_fork_default: 'Use default fork option',
  com_ui_fork_remember: 'Remember',
  com_ui_fork_split_target_setting: 'Start fork from target message by default',
  com_ui_fork_split_target: 'Start fork here',
  com_ui_fork_remember_checked:
    'Your selection will be remembered after usage. Change this at any time in the settings.',
  com_ui_fork_all_target: 'Include all to/from here',
  com_ui_fork_branches: 'Include related branches',
  com_ui_fork_visible: 'Visible messages only',
  com_ui_fork_from_message: 'Select a fork option',
  com_ui_mention: 'Mention an endpoint, assistant, or preset to quickly switch to it',
  com_ui_add_model_preset: 'Add a model or preset for an additional response',
  com_assistants_max_starters_reached: 'Max number of conversation starters reached',
  com_ui_duplication_success: 'Successfully duplicated conversation',
  com_ui_duplication_processing: 'Duplicating conversation...',
  com_ui_duplication_error: 'There was an error duplicating the conversation',
  com_ui_regenerate: 'Regenerate',
  com_ui_continue: 'Continue',
  com_ui_edit: 'Edit',
  com_ui_loading: 'Loading...',
  com_ui_success: 'Success',
  com_ui_logo: '{0} Logo',
  com_ui_all: 'all',
  com_ui_all_proper: 'All',
  com_ui_clear: 'Clear',
  com_ui_revoke: 'Revoke',
  com_ui_revoke_info: 'Revoke all user provided credentials',
  com_ui_revoke_keys: 'Revoke Keys',
  com_ui_revoke_keys_confirm: 'Are you sure you want to revoke all keys?',
  com_ui_revoke_key_endpoint: 'Revoke Key for {0}',
  com_ui_revoke_key_confirm: 'Are you sure you want to revoke this key?',
  com_ui_import_conversation: 'Import',
  com_ui_nothing_found: 'Nothing found',
  com_ui_go_to_conversation: 'Go to conversation',
  com_ui_import_conversation_info: 'Import conversations from a JSON file',
  com_ui_import_conversation_success: 'Conversations imported successfully',
  com_ui_import_conversation_error: 'There was an error importing your conversations',
  com_ui_import_conversation_file_type_error: 'Unsupported import type',
  com_ui_confirm_action: 'Confirm Action',
  com_ui_chat: 'Chat',
  com_ui_chat_history: 'Chat History',
  com_ui_controls: 'Controls',
  com_ui_dashboard: 'Dashboard',
  com_ui_chats: 'chats',
  com_ui_avatar: 'Avatar',
  com_ui_unknown: 'Unknown',
  com_ui_result: 'Result',
  com_ui_image_gen: 'Image Gen',
  com_ui_assistant: 'Assistant',
  com_ui_assistant_deleted: 'Successfully deleted assistant',
  com_ui_assistant_delete_error: 'There was an error deleting the assistant',
  com_ui_assistants: 'Assistants',
  com_ui_attachment: 'Attachment',
  com_ui_assistants_output: 'Assistants Output',
  com_ui_agent: 'Agent',
  com_ui_agent_deleted: 'Successfully deleted agent',
  com_ui_agent_delete_error: 'There was an error deleting the agent',
  com_ui_agents: 'Agents',
  com_ui_delete_agent_confirm: 'Are you sure you want to delete this agent?',
  com_ui_delete: 'Delete',
  com_ui_create: 'Create',
  com_ui_create_prompt: 'Create Prompt',
  com_ui_share: 'Share',
  com_ui_share_var: 'Share {0}',
  com_ui_enter_var: 'Enter {0}',
  com_ui_copy_link: 'Copy link',
  com_ui_update_link: 'Update link',
  com_ui_create_link: 'Create link',
  com_ui_share_to_all_users: 'Share to all users',
  com_ui_my_prompts: 'My Prompts',
  com_ui_no_category: 'No category',
  com_ui_shared_prompts: 'Shared Prompts',
  com_ui_prompts_allow_use: 'Allow using Prompts',
  com_ui_prompts_allow_create: 'Allow creating Prompts',
  com_ui_prompts_allow_share_global: 'Allow sharing Prompts to all users',
  com_ui_prompt_shared_to_all: 'This prompt is shared to all users',
  com_ui_prompt_update_error: 'There was an error updating the prompt',
  com_ui_agents_allow_share_global: 'Allow sharing Agents to all users',
  com_ui_agents_allow_use: 'Allow using Agents',
  com_ui_agents_allow_create: 'Allow creating Agents',
  com_ui_agent_duplicated: 'Agent duplicated successfully',
  com_ui_agent_duplicate_error: 'There was an error duplicating the agent',
  com_ui_prompt_already_shared_to_all: 'This prompt is already shared to all users',
  com_ui_description_placeholder: 'Optional: Enter a description to display for the prompt',
  com_ui_command_placeholder: 'Optional: Enter a command for the prompt or name will be used.',
  com_ui_command_usage_placeholder: 'Select a Prompt by command or name',
  com_ui_no_prompt_description: 'No description found.',
  com_ui_share_link_to_chat: 'Share link to chat',
  com_ui_share_error: 'There was an error sharing the chat link',
  com_ui_share_retrieve_error: 'There was an error retrieving the shared links',
  com_ui_share_delete_error: 'There was an error deleting the shared link',
  com_ui_share_create_message: 'Your name and any messages you add after sharing stay private.',
  com_ui_share_created_message:
    'A shared link to your chat has been created. Manage previously shared chats at any time via Settings.',
  com_ui_share_update_message:
    'Your name, custom instructions, and any messages you add after sharing stay private.',
  com_ui_share_updated_message:
    'A shared link to your chat has been updated. Manage previously shared chats at any time via Settings.',
  com_ui_shared_link_not_found: 'Shared link not found',
  com_ui_delete_conversation: 'Delete chat?',
  com_ui_delete_confirm: 'This will delete',
  com_ui_delete_tool: 'Delete Tool',
  com_ui_delete_tool_confirm: 'Are you sure you want to delete this tool?',
  com_ui_delete_action: 'Delete Action',
  com_ui_delete_action_confirm: 'Are you sure you want to delete this action?',
  com_ui_delete_confirm_prompt_version_var:
    'This will delete the selected version for "{0}." If no other versions exist, the prompt will be deleted.',
  com_ui_delete_assistant_confirm:
    'Are you sure you want to delete this Assistant? This cannot be undone.',
  com_ui_rename: 'Rename',
  com_ui_archive: 'Archive',
  com_ui_duplicate: 'Duplicate',
  com_ui_archive_error: 'Failed to archive conversation',
  com_ui_unarchive: 'Unarchive',
  com_ui_unarchive_error: 'Failed to unarchive conversation',
  com_ui_more_options: 'More',
  com_ui_preview: 'Preview',
  com_ui_upload: 'Upload',
  com_ui_connect: 'Connect',
  com_ui_locked: 'Locked',
  com_ui_upload_delay:
    'Uploading "{0}" is taking more time than anticipated. Please wait while the file finishes indexing for retrieval.',
  com_ui_schema: 'Schema',
  com_ui_enter_openapi_schema: 'Enter your OpenAPI schema here',
  com_ui_privacy_policy: 'Privacy policy',
  com_ui_privacy_policy_url: 'Privacy Policy URL',
  com_ui_terms_of_service: 'Terms of service',
  com_ui_use_micrphone: 'Use microphone',
  com_ui_min_tags: 'Cannot remove more values, a minimum of {0} are required.',
  com_ui_max_tags: 'Maximum number allowed is {0}, using latest values.',
  com_ui_bookmarks: 'Bookmarks',
  com_ui_bookmarks_new: 'New Bookmark',
  com_ui_bookmark_delete_confirm: 'Are you sure you want to delete this bookmark?',
  com_ui_bookmarks_title: 'Title',
  com_ui_bookmarks_count: 'Count',
  com_ui_bookmarks_description: 'Description',
  com_ui_bookmarks_create_success: 'Bookmark created successfully',
  com_ui_bookmarks_update_success: 'Bookmark updated successfully',
  com_ui_bookmarks_delete_success: 'Bookmark deleted successfully',
  com_ui_bookmarks_create_exists: 'This bookmark already exists',
  com_ui_bookmarks_create_error: 'There was an error creating the bookmark',
  com_ui_bookmarks_update_error: 'There was an error updating the bookmark',
  com_ui_bookmarks_delete_error: 'There was an error deleting the bookmark',
  com_ui_bookmarks_add_to_conversation: 'Add to current conversation',
  com_ui_bookmarks_filter: 'Filter bookmarks...',
  com_ui_bookmarks_delete: 'Delete Bookmark',
  com_ui_no_bookmarks: 'it seems like you have no bookmarks yet. Click on a chat and add a new one',
  com_ui_no_conversation_id: 'No conversation ID found',
  com_ui_add_multi_conversation: 'Add multi-conversation',
  com_ui_duplicate_agent_confirm: 'Are you sure you want to duplicate this agent?',
  com_auth_error_login:
    'Unable to login with the information provided. Please check your credentials and try again.',
  com_auth_error_login_rl:
    'Too many login attempts in a short amount of time. Please try again later.',
  com_auth_error_login_ban:
    'Your account has been temporarily banned due to violations of our service.',
  com_auth_error_login_server:
    'There was an internal server error. Please wait a few moments and try again.',
  com_auth_error_login_unverified:
    'Your account has not been verified. Please check your email for a verification link.',
  com_auth_no_account: 'Don\'t have an account?',
  com_auth_sign_up: 'Sign up',
  com_auth_sign_in: 'Sign in',
  com_auth_google_login: 'Continue with Google',
  com_auth_facebook_login: 'Continue with Facebook',
  com_auth_github_login: 'Continue with Github',
  com_auth_discord_login: 'Continue with Discord',
  com_auth_email: 'Email',
  com_auth_email_required: 'Email is required',
  com_auth_email_min_length: 'Email must be at least 6 characters',
  com_auth_email_max_length: 'Email should not be longer than 120 characters',
  com_auth_email_pattern: 'You must enter a valid email address',
  com_auth_email_address: 'Email address',
  com_auth_password: 'Password',
  com_auth_password_required: 'Password is required',
  com_auth_password_min_length: 'Password must be at least 8 characters',
  com_auth_password_max_length: 'Password must be less than 128 characters',
  com_auth_password_forgot: 'Forgot Password?',
  com_auth_password_confirm: 'Confirm password',
  com_auth_password_not_match: 'Passwords do not match',
  com_auth_continue: 'Continue',
  com_auth_create_account: 'Create your account',
  com_auth_error_create:
    'There was an error attempting to register your account. Please try again.',
  com_auth_full_name: 'Full name',
  com_auth_name_required: 'Name is required',
  com_auth_name_min_length: 'Name must be at least 3 characters',
  com_auth_name_max_length: 'Name must be less than 80 characters',
  com_auth_username: 'Username (optional)',
  com_auth_username_required: 'Username is required',
  com_auth_username_min_length: 'Username must be at least 2 characters',
  com_auth_username_max_length: 'Username must be less than 20 characters',
  com_auth_already_have_account: 'Already have an account?',
  com_auth_login: 'Login',
  com_auth_registration_success_insecure: 'Registration successful.',
  com_auth_registration_success_generic: 'Please check your email to verify your email address.',
  com_auth_reset_password: 'Reset your password',
  com_auth_click: 'Click',
  com_auth_here: 'HERE',
  com_auth_to_reset_your_password: 'to reset your password.',
  com_auth_reset_password_link_sent: 'Email Sent',
  com_auth_reset_password_if_email_exists:
    'If an account with that email exists, an email with password reset instructions has been sent. Please make sure to check your spam folder.',
  com_auth_reset_password_email_sent:
    'If the user is registered, an email will be sent to the inbox.',
  com_auth_reset_password_success: 'Password Reset Success',
  com_auth_login_with_new_password: 'You may now login with your new password.',
  com_auth_error_invalid_reset_token: 'This password reset token is no longer valid.',
  com_auth_click_here: 'Click here',
  com_auth_to_try_again: 'to try again.',
  com_auth_submit_registration: 'Submit registration',
  com_auth_welcome_back: 'Welcome back',
  com_auth_back_to_login: 'Back to Login',
  com_auth_email_verification_failed: 'Email verification failed',
  com_auth_email_verification_rate_limited: 'Too many requests. Please try again later',
  com_auth_email_verification_success: 'Email verified successfully',
  com_auth_email_resent_success: 'Verification email resent successfully',
  com_auth_email_resent_failed: 'Failed to resend verification email',
  com_auth_email_verification_failed_token_missing: 'Verification failed, token missing',
  com_auth_email_verification_invalid: 'Invalid email verification',
  com_auth_email_verification_in_progress: 'Verifying your email, please wait',
  com_auth_email_verification_resend_prompt: 'Didn\'t receive the email?',
  com_auth_email_resend_link: 'Resend Email',
  com_auth_email_verification_redirecting: 'Redirecting in {0} seconds...',
  com_endpoint_open_menu: 'Open Menu',
  com_endpoint_bing_enable_sydney: 'Enable Sydney',
  com_endpoint_bing_to_enable_sydney: 'To enable Sydney',
  com_endpoint_bing_jailbreak: 'Jailbreak',
  com_endpoint_bing_context_placeholder:
    'Bing can use up to 7k tokens for \'context\', which it can reference for the conversation. The specific limit is not known but may run into errors exceeding 7k tokens',
  com_endpoint_bing_system_message_placeholder:
    'WARNING: Misuse of this feature can get you BANNED from using Bing! Click on \'System Message\' for full instructions and the default message if omitted, which is the \'Sydney\' preset that is considered safe.',
  com_endpoint_system_message: 'System Message',
  com_endpoint_message: 'Message',
  com_endpoint_message_not_appendable: 'Edit your message or Regenerate.',
  com_endpoint_default_blank: 'default: blank',
  com_endpoint_default_false: 'default: false',
  com_endpoint_default_creative: 'default: creative',
  com_endpoint_default_empty: 'default: empty',
  com_endpoint_default_with_num: 'default: {0}',
  com_endpoint_context: 'Context',
  com_endpoint_tone_style: 'Tone Style',
  com_endpoint_token_count: 'Token count',
  com_endpoint_output: 'Output',
  com_endpoint_context_tokens: 'Max Context Tokens',
  com_endpoint_context_info: `The maximum number of tokens that can be used for context. Use this for control of how many tokens are sent per request.
  If unspecified, will use system defaults based on known models' context size. Setting higher values may result in errors and/or higher token cost.`,
  com_endpoint_google_temp:
    'Higher values = more random, while lower values = more focused and deterministic. We recommend altering this or Top P but not both.',
  com_endpoint_google_topp:
    'Top-p changes how the model selects tokens for output. Tokens are selected from most K (see topK parameter) probable to least until the sum of their probabilities equals the top-p value.',
  com_endpoint_google_topk:
    'Top-k changes how the model selects tokens for output. A top-k of 1 means the selected token is the most probable among all tokens in the model\'s vocabulary (also called greedy decoding), while a top-k of 3 means that the next token is selected from among the 3 most probable tokens (using temperature).',
  com_endpoint_google_maxoutputtokens:
    'Maximum number of tokens that can be generated in the response. Specify a lower value for shorter responses and a higher value for longer responses. Note: models may stop before reaching this maximum.',
  com_endpoint_google_custom_name_placeholder: 'Set a custom name for Google',
  com_endpoint_prompt_prefix_placeholder: 'Set custom instructions or context. Ignored if empty.',
  com_endpoint_instructions_assistants_placeholder:
    'Overrides the instructions of the assistant. This is useful for modifying the behavior on a per-run basis.',
  com_endpoint_prompt_prefix_assistants_placeholder:
    'Set additional instructions or context on top of the Assistant\'s main instructions. Ignored if empty.',
  com_endpoint_custom_name: 'Custom Name',
  com_endpoint_prompt_prefix: 'Custom Instructions',
  com_endpoint_prompt_prefix_assistants: 'Additional Instructions',
  com_endpoint_instructions_assistants: 'Override Instructions',
  com_endpoint_temperature: 'Temperature',
  com_endpoint_default: 'default',
  com_endpoint_top_p: 'Top P',
  com_endpoint_top_k: 'Top K',
  com_endpoint_max_output_tokens: 'Max Output Tokens',
  com_endpoint_stop: 'Stop Sequences',
  com_endpoint_stop_placeholder: 'Separate values by pressing `Enter`',
  com_endpoint_openai_max_tokens: `Optional \`max_tokens\` field, representing the maximum number of tokens that can be generated in the chat completion.

    The total length of input tokens and generated tokens is limited by the models context length. You may experience errors if this number exceeds the max context tokens.`,
  com_endpoint_openai_temp:
    'Higher values = more random, while lower values = more focused and deterministic. We recommend altering this or Top P but not both.',
  com_endpoint_openai_max:
    'The max tokens to generate. The total length of input tokens and generated tokens is limited by the model\'s context length.',
  com_endpoint_openai_topp:
    'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We recommend altering this or temperature but not both.',
  com_endpoint_openai_freq:
    'Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.',
  com_endpoint_openai_pres:
    'Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.',
  com_endpoint_openai_resend:
    'Resend all previously attached images. Note: this can significantly increase token cost and you may experience errors with many image attachments.',
  com_endpoint_openai_resend_files:
    'Resend all previously attached files. Note: this will increase token cost and you may experience errors with many attachments.',
  com_endpoint_openai_detail:
    'The resolution for Vision requests. "Low" is cheaper and faster, "High" is more detailed and expensive, and "Auto" will automatically choose between the two based on the image resolution.',
  com_endpoint_openai_stop: 'Up to 4 sequences where the API will stop generating further tokens.',
  com_endpoint_openai_custom_name_placeholder: 'Set a custom name for the AI',
  com_endpoint_openai_prompt_prefix_placeholder:
    'Set custom instructions to include in System Message. Default: none',
  com_endpoint_anthropic_temp:
    'Ranges from 0 to 1. Use temp closer to 0 for analytical / multiple choice, and closer to 1 for creative and generative tasks. We recommend altering this or Top P but not both.',
  com_endpoint_anthropic_topp:
    'Top-p changes how the model selects tokens for output. Tokens are selected from most K (see topK parameter) probable to least until the sum of their probabilities equals the top-p value.',
  com_endpoint_anthropic_topk:
    'Top-k changes how the model selects tokens for output. A top-k of 1 means the selected token is the most probable among all tokens in the model\'s vocabulary (also called greedy decoding), while a top-k of 3 means that the next token is selected from among the 3 most probable tokens (using temperature).',
  com_endpoint_anthropic_maxoutputtokens:
    'Maximum number of tokens that can be generated in the response. Specify a lower value for shorter responses and a higher value for longer responses. Note: models may stop before reaching this maximum.',
  com_endpoint_anthropic_prompt_cache:
    'Prompt caching allows reusing large context or instructions across API calls, reducing costs and latency',
  com_endpoint_prompt_cache: 'Use Prompt Caching',
  com_endpoint_anthropic_custom_name_placeholder: 'Set a custom name for Anthropic',
  com_endpoint_frequency_penalty: 'Frequency Penalty',
  com_endpoint_presence_penalty: 'Presence Penalty',
  com_endpoint_plug_use_functions: 'Use Functions',
  com_endpoint_plug_resend_files: 'Resend Files',
  com_endpoint_plug_resend_images: 'Resend Images',
  com_endpoint_plug_image_detail: 'Image Detail',
  com_endpoint_plug_skip_completion: 'Skip Completion',
  com_endpoint_disabled_with_tools: 'disabled with tools',
  com_endpoint_disabled_with_tools_placeholder: 'Disabled with Tools Selected',
  com_endpoint_plug_set_custom_instructions_for_gpt_placeholder:
    'Set custom instructions to include in System Message. Default: none',
  com_endpoint_import: 'Import',
  com_endpoint_set_custom_name: 'Set a custom name, in case you can find this preset',
  com_endpoint_preset_delete_confirm: 'Are you sure you want to delete this preset?',
  com_endpoint_preset_clear_all_confirm: 'Are you sure you want to delete all of your presets?',
  com_endpoint_preset_import: 'Preset Imported!',
  com_endpoint_preset_import_error: 'There was an error importing your preset. Please try again.',
  com_endpoint_preset_save_error: 'There was an error saving your preset. Please try again.',
  com_endpoint_preset_delete_error: 'There was an error deleting your preset. Please try again.',
  com_endpoint_preset_default_removed: 'is no longer the default preset.',
  com_endpoint_preset_default_item: 'Default:',
  com_endpoint_preset_default_none: 'No default preset active.',
  com_endpoint_preset_title: 'Preset',
  com_ui_saved: 'Saved!',
  com_endpoint_preset_default: 'is now the default preset.',
  com_endpoint_preset: 'preset',
  com_endpoint_presets: 'presets',
  com_endpoint_preset_selected: 'Preset Active!',
  com_endpoint_preset_selected_title: 'Active!',
  com_endpoint_preset_name: 'Preset Name',
  com_endpoint_new_topic: 'New Topic',
  com_endpoint: 'Endpoint',
  com_endpoint_hide: 'Hide',
  com_endpoint_show: 'Show',
  com_endpoint_examples: ' Presets',
  com_endpoint_completion: 'Completion',
  com_endpoint_agent: 'Agent',
  com_endpoint_show_what_settings: 'Show {0} Settings',
  com_endpoint_export: 'Export',
  com_endpoint_export_share: 'Export/Share',
  com_endpoint_assistant: 'Assistant',
  com_endpoint_search: 'Search endpoint by name',
  com_endpoint_use_active_assistant: 'Use Active Assistant',
  com_endpoint_assistant_model: 'Assistant Model',
  com_endpoint_save_as_preset: 'Save As Preset',
  com_endpoint_presets_clear_warning:
    'Are you sure you want to clear all presets? This is irreversible.',
  com_endpoint_not_implemented: 'Not implemented',
  com_endpoint_no_presets: 'No presets yet, use the settings button to create one',
  com_endpoint_not_available: 'No endpoint available',
  com_endpoint_view_options: 'View Options',
  com_endpoint_save_convo_as_preset: 'Save Conversation as Preset',
  com_endpoint_my_preset: 'My Preset',
  com_endpoint_agent_model: 'Agent Model (Recommended: GPT-3.5)',
  com_endpoint_completion_model: 'Completion Model (Recommended: GPT-4)',
  com_endpoint_func_hover: 'Enable use of Plugins as OpenAI Functions',
  com_endpoint_skip_hover:
    'Enable skipping the completion step, which reviews the final answer and generated steps',
  com_endpoint_config_key: 'Set API Key',
  com_endpoint_agent_placeholder: 'Please select an Agent',
  com_endpoint_assistant_placeholder: 'Please select an Assistant from the right-hand Side Panel',
  com_endpoint_config_placeholder: 'Set your Key in the Header menu to chat.',
  com_endpoint_config_key_for: 'Set API Key for',
  com_endpoint_config_key_name: 'Key',
  com_endpoint_config_value: 'Enter value for',
  com_endpoint_config_key_name_placeholder: 'Set API key first',
  com_endpoint_config_key_encryption: 'Your key will be encrypted and deleted at',
  com_endpoint_config_key_never_expires: 'Your key will never expire',
  com_endpoint_config_key_expiry: 'the expiry time',
  com_endpoint_config_click_here: 'Click Here',
  com_endpoint_config_google_service_key: 'Google Service Account Key',
  com_endpoint_config_google_cloud_platform: '(from Google Cloud Platform)',
  com_endpoint_config_google_api_key: 'Google API Key',
  com_endpoint_config_google_gemini_api: '(Gemini API)',
  com_endpoint_config_google_api_info: 'To get your Generative Language API key (for Gemini),',
  com_endpoint_config_key_import_json_key: 'Import Service Account JSON Key.',
  com_endpoint_config_key_import_json_key_success: 'Successfully Imported Service Account JSON Key',
  com_endpoint_config_key_import_json_key_invalid:
    'Invalid Service Account JSON Key, Did you import the correct file?',
  com_endpoint_config_key_get_edge_key: 'To get your Access token for Bing, login to',
  com_endpoint_config_key_get_edge_key_dev_tool:
    'Use dev tools or an extension while logged into the site to copy the content of the _U cookie. If this fails, follow these',
  com_endpoint_config_key_edge_instructions: 'instructions',
  com_endpoint_config_key_edge_full_key_string: 'to provide the full cookie strings.',
  com_endpoint_config_key_chatgpt: 'To get your Access token For ChatGPT \'Free Version\', login to',
  com_endpoint_config_key_chatgpt_then_visit: 'then visit',
  com_endpoint_config_key_chatgpt_copy_token: 'Copy access token.',
  com_endpoint_config_key_google_need_to: 'You need to',
  com_endpoint_config_key_google_vertex_ai: 'Enable Vertex AI',
  com_endpoint_config_key_google_vertex_api: 'API on Google Cloud, then',
  com_endpoint_config_key_google_service_account: 'Create a Service Account',
  com_endpoint_config_key_google_vertex_api_role:
    'Make sure to click \'Create and Continue\' to give at least the \'Vertex AI User\' role. Lastly, create a JSON key to import here.',
  com_nav_account_settings: 'Account Settings',
  com_nav_font_size: 'Message Font Size',
  com_nav_font_size_xs: 'Extra Small',
  com_nav_font_size_sm: 'Small',
  com_nav_font_size_base: 'Medium',
  com_nav_font_size_lg: 'Large',
  com_nav_font_size_xl: 'Extra Large',
  com_nav_welcome_assistant: 'Please Select an Assistant',
  com_nav_welcome_agent: 'Please Select an Agent',
  com_nav_welcome_message: 'How can I help you today?',
  com_nav_auto_scroll: 'Auto-Scroll to latest message on chat open',
  com_nav_user_msg_markdown: 'Render user messages as markdown',
  com_nav_hide_panel: 'Hide right-most side panel',
  com_nav_modular_chat: 'Enable switching Endpoints mid-conversation',
  com_nav_latex_parsing: 'Parsing LaTeX in messages (may affect performance)',
  com_nav_text_to_speech: 'Text to Speech',
  com_nav_automatic_playback: 'Autoplay Latest Message',
  com_nav_speech_to_text: 'Speech to Text',
  com_nav_profile_picture: 'Profile Picture',
  com_nav_change_picture: 'Change picture',
  com_nav_plugin_store: 'Plugin store',
  com_nav_plugin_install: 'Install',
  com_nav_plugin_uninstall: 'Uninstall',
  com_ui_add: 'Add',
  com_nav_tool_remove: 'Remove',
  com_nav_tool_dialog_agents: 'Agent Tools',
  com_nav_tool_dialog: 'Assistant Tools',
  com_ui_misc: 'Misc.',
  com_ui_roleplay: 'Roleplay',
  com_ui_write: 'Writing',
  com_ui_idea: 'Ideas',
  com_ui_shop: 'Shopping',
  com_ui_finance: 'Finance',
  com_ui_code: 'Code',
  com_ui_travel: 'Travel',
  com_ui_teach_or_explain: 'Learning',
  com_ui_select_file: 'Select a file',
  com_ui_drag_drop_file: 'Drag and drop a file here',
  com_ui_upload_image: 'Upload an image',
  com_ui_select_a_category: 'No category selected',
  com_ui_clear_all: 'Clear all',
  com_nav_tool_dialog_description: 'Assistant must be saved to persist tool selections.',
  com_show_agent_settings: 'Show Agent Settings',
  com_show_completion_settings: 'Show Completion Settings',
  com_hide_examples: 'Hide Examples',
  com_show_examples: 'Show Examples',
  com_nav_plugin_search: 'Search plugins',
  com_nav_tool_search: 'Search tools',
  com_nav_plugin_auth_error:
    'There was an error attempting to authenticate this plugin. Please try again.',
  com_nav_export_filename: 'Filename',
  com_nav_export_filename_placeholder: 'Set the filename',
  com_nav_export_type: 'Type',
  com_nav_export_include_endpoint_options: 'Include endpoint options',
  com_nav_enabled: 'Enabled',
  com_nav_not_supported: 'Not Supported',
  com_nav_export_all_message_branches: 'Export all message branches',
  com_nav_export_recursive_or_sequential: 'Recursive or sequential?',
  com_nav_export_recursive: 'Recursive',
  com_nav_export_conversation: 'Export conversation',
  com_nav_export: 'Export',
  com_ui_delete_shared_link: 'Delete shared link?',
  com_nav_shared_links: 'Shared links',
  com_nav_shared_links_manage: 'Manage',
  com_nav_shared_links_empty: 'You have no shared links.',
  com_nav_shared_links_name: 'Name',
  com_nav_shared_links_date_shared: 'Date shared',
  com_nav_source_chat: 'View source chat',
  com_nav_my_files: 'My Files',
  com_nav_theme: 'Theme',
  com_nav_theme_system: 'System',
  com_nav_theme_dark: 'Dark',
  com_nav_theme_light: 'Light',
  com_nav_enter_to_send: 'Press Enter to send messages',
  com_nav_user_name_display: 'Display username in messages',
  com_nav_save_drafts: 'Save drafts locally',
  com_nav_chat_direction: 'Chat direction',
  com_nav_show_code: 'Always show code when using code interpreter',
  com_nav_auto_send_prompts: 'Auto-send Prompts',
  com_nav_always_make_prod: 'Always make new versions production',
  com_nav_clear_all_chats: 'Clear all chats',
  com_nav_clear_cache_confirm_message: 'Are you sure you want to clear the cache?',
  com_nav_confirm_clear: 'Confirm Clear',
  com_nav_close_sidebar: 'Close sidebar',
  com_nav_open_sidebar: 'Open sidebar',
  com_nav_send_message: 'Send message',
  com_nav_stop_generating: 'Stop generating',
  com_nav_log_out: 'Log out',
  com_nav_user: 'USER',
  com_nav_archived_chats: 'Archived chats',
  com_nav_archived_chats_manage: 'Manage',
  com_nav_archived_chats_empty: 'You have no archived conversations.',
  com_nav_archive_all_chats: 'Archive all chats',
  com_nav_archive_all: 'Archive all',
  com_nav_archive_name: 'Name',
  com_nav_archive_created_at: 'Date Archived',
  com_nav_clear_conversation: 'Clear conversations',
  com_nav_clear_conversation_confirm_message:
    'Are you sure you want to clear all conversations? This is irreversible.',
  com_nav_help_faq: 'Help & FAQ',
  com_nav_settings: 'Settings',
  com_nav_search_placeholder: 'Search messages',
  com_nav_delete_account: 'Delete account',
  com_nav_delete_account_confirm: 'Delete account - are you sure?',
  com_nav_delete_account_button: 'Permanently delete my account',
  com_nav_delete_account_email_placeholder: 'Please enter your account email',
  com_nav_delete_account_confirm_placeholder: 'To proceed, type "DELETE" in the input field below',
  com_nav_delete_warning: 'WARNING: This will permanently delete your account.',
  com_nav_delete_data_info: 'All your data will be deleted.',
  com_nav_conversation_mode: 'Conversation Mode',
  com_nav_auto_send_text: 'Auto send text',
  com_nav_auto_send_text_disabled: 'set -1 to disable',
  com_nav_auto_transcribe_audio: 'Auto transcribe audio',
  com_nav_db_sensitivity: 'Decibel sensitivity',
  com_nav_playback_rate: 'Audio Playback Rate',
  com_nav_audio_play_error: 'Error playing audio: {0}',
  com_nav_audio_process_error: 'Error processing audio: {0}',
  com_nav_long_audio_warning: 'Longer texts will take longer to process.',
  com_nav_tts_init_error: 'Failed to initialize text-to-speech: {0}',
  com_nav_tts_unsupported_error:
    'Text-to-speech for the selected engine is not supported in this browser.',
  com_nav_source_buffer_error: 'Error setting up audio playback. Please refresh the page.',
  com_nav_media_source_init_error:
    'Unable to prepare audio player. Please check your browser settings.',
  com_nav_buffer_append_error: 'Problem with audio streaming. The playback may be interrupted.',
  com_nav_speech_cancel_error: 'Unable to stop audio playback. You may need to refresh the page.',
  com_nav_voices_fetch_error:
    'Could not retrieve voice options. Please check your internet connection.',
  com_nav_engine: 'Engine',
  com_nav_browser: 'Browser',
  com_nav_edge: 'Edge',
  com_nav_external: 'External',
  com_nav_delete_cache_storage: 'Delete TTS cache storage',
  com_nav_enable_cache_tts: 'Enable cache TTS',
  com_nav_voice_select: 'Voice',
  com_nav_enable_cloud_browser_voice: 'Use cloud-based voices',
  com_nav_info_enter_to_send:
    'When enabled, pressing `ENTER` will send your message. When disabled, pressing Enter will add a new line, and you\'ll need to press `CTRL + ENTER` / `⌘ + ENTER` to send your message.',
  com_nav_info_save_draft:
    'When enabled, the text and attachments you enter in the chat form will be automatically saved locally as drafts. These drafts will be available even if you reload the page or switch to a different conversation. Drafts are stored locally on your device and are deleted once the message is sent.',
  com_nav_info_fork_change_default:
    '`Visible messages only` includes just the direct path to the selected message. `Include related branches` adds branches along the path. `Include all to/from here` includes all connected messages and branches.',
  com_nav_info_fork_split_target_setting:
    'When enabled, forking will commence from the target message to the latest message in the conversation, according to the behavior selected.',
  com_nav_info_user_name_display:
    'When enabled, the username of the sender will be shown above each message you send. When disabled, you will only see "You" above your messages.',
  com_nav_info_latex_parsing:
    'When enabled, LaTeX code in messages will be rendered as mathematical equations. Disabling this may improve performance if you don\'t need LaTeX rendering.',
  com_nav_info_revoke:
    'This action will revoke and remove all the API keys that you have provided. You will need to re-enter these credentials to continue using those endpoints.',
  com_nav_info_delete_cache_storage:
    'This action will delete all cached TTS (Text-to-Speech) audio files stored on your device. Cached audio files are used to speed up playback of previously generated TTS audio, but they can consume storage space on your device.',
  // Command Settings Tab
  com_nav_chat_commands: 'Chat Commands',
  com_nav_chat_commands_info:
    'These commands are activated by typing specific characters at the beginning of your message. Each command is triggered by its designated prefix. You can disable them if you frequently use these characters to start messages.',
  com_nav_commands: 'Commands',
  com_nav_commands_tab: 'Command Settings',
  com_nav_at_command: '@-Command',
  com_nav_at_command_description:
    'Toggle command "@" for switching endpoints, models, presets, etc.',
  com_nav_plus_command: '+-Command',
  com_nav_plus_command_description: 'Toggle command "+" for adding a multi-response setting',
  com_nav_slash_command: '/-Command',
  com_nav_slash_command_description: 'Toggle command "/" for selecting a prompt via keyboard',
  com_nav_command_settings: 'Command Settings',
  com_nav_command_settings_description: 'Customize which commands are available in the chat',
  com_nav_no_search_results: 'No search results found',
  com_nav_setting_general: 'General',
  com_nav_setting_chat: 'Chat',
  com_nav_setting_beta: 'Beta features',
  com_nav_setting_data: 'Data controls',
  com_nav_setting_account: 'Account',
  com_nav_setting_speech: 'Speech',
  com_nav_language: 'Language',
  com_nav_lang_auto: 'Auto detect',
  com_nav_lang_english: 'English',
  com_nav_lang_chinese: '中文',
  com_nav_lang_german: 'Deutsch',
  com_nav_lang_spanish: 'Español',
  com_nav_lang_french: 'Français ',
  com_nav_lang_italian: 'Italiano',
  com_nav_lang_polish: 'Polski',
  com_nav_lang_brazilian_portuguese: 'Português Brasileiro',
  com_nav_lang_russian: 'Русский',
  com_nav_lang_japanese: '日本語',
  com_nav_lang_swedish: 'Svenska',
  com_nav_lang_korean: '한국어',
  com_nav_lang_vietnamese: 'Tiếng Việt',
  com_nav_lang_traditionalchinese: '繁體中文',
  com_nav_lang_arabic: 'العربية',
  com_nav_lang_turkish: 'Türkçe',
  com_nav_lang_dutch: 'Nederlands',
  aa_prompt_title1: 'メルエビ作成したいとき',
  aa_prompt_body1: `下記でエビデンス作ってください。作成時注意についてはコメントしなくて良いです。

  会社名：〇〇〇〇〇〇〇〇〇〇
  商材名：〇〇、契約期間：〇〇、月額：〇〇
  商材名：〇〇、契約期間：〇〇、月額：〇〇
  支払い方法：〇〇
  作成時注意：フォーマット内に口語を入れず、期間は日付で表記。計算式の表記は不要。
  
  フォーマットは下記です
  
  内容に問題がなければ「ココカラ」〜「ココマデ」をコピーし『確認した』という旨を添えてご返信をお願い致します。
  
  ----------------------------ココカラ----------------------------
  
  ▼ご契約社名
  会社名
  
  ▼ご契約内容
  ・商材名:商材名1
  ・ご契約期間:期間1
  ・月額（税別）:金額1
  ・小計（税別）::期間1x金額1
  ・合計（税別）：商材が複数ある場合のみ記載
  
  ▼お支払い方法
  
  ----------------------------ココマデ----------------------------
  `,
  aa_prompt_title2: '提案する企業へのペルソナ把握',
  aa_prompt_body2: `下記のようなサービスの一般的なペルソナを3つまで教えてください。基本情報（性別・年齢・家族構成・職業）であったり、思考（解決したいない悩み）などを詳しく教えてください。
  また、上記とは別に、出していただいたペルソナが、どのような生活を送る中でサービスを利用しているかを物語風に教えてください。サービスを利用している理由についても教えてください。
  ーーーーーーーーー
  サービス内容：
  【サービス内容を記載（HPやサービスページなどから転記）
  `,
  aa_prompt_title3: 'セミナー企画作成プロンプト',
  aa_prompt_body3: `あなたはBtoB向けのSaaSプロダクトを展開する企業のマーケターです。
  以下の仕様に従ってセミナー企画のアイデアを出してください。
  
  #テーマ
  （例）ダイレクトマーケティングにおけるLP（Landing Page）活用の最新トレンドについて
  
  #目的
  （例）通販やサービスのダイレクトマーケティングを担当とするWebマーケター向けて、LP(Landing Page）でユーザーに適切な体験を提供し、コンバージョン率（CVR）を向上することは必須の課題です。今回のセミナーでは、LP最新のトレンドを伝えたうえで、今日からの業務に活かせるヒントを持ち帰っていただきたいと思っています。
  
  #注意点
  ・セミナータイトルの候補を5つ程度出す
  ・セミナーの概要を説明する文章を作成する（200文字程度）
  ・セミナーのアジェンダ案を5つ程度出す
  ・セミナーのメリットをまとめる
  ・セミナーの見どころをまとめる
  `,
  aa_prompt_title4: 'インサイト分析の提案をする際の設問設計',
  aa_prompt_body4: `あなたは一流のマーケターです。
  下記LPの訴求軸を決めるにあたり、顧客に聞くと効果的な設問を10個教えてください。
  【URLを入れる（パラメータはつけたままにする）】
  
  設問の条件：
  1. 利用者の属性を特定できる内容であること
  2. 具体的で、分かりやすいこと
  3. 商品である「〇〇（商品名を入れる）」についての質問を含むこと
  `,
  aa_prompt_title5: 'セミナータイトルの候補出し',
  aa_prompt_body5: `依頼者条件: セミナーを開催する人や企業など、セミナータイトルの候補を出したい人
  制作者条件: セミナータイトルの候補出しプロンプトを作成する人
  目的と目標: セミナーのタイトルを適切に決定するために、候補のアイデアを出すこと
  評価基準: 提案されたタイトルがセミナーの内容や目的に適しているか、魅力的で興味を引くか、参加者にとって理解しやすいかなどを考慮して評価する
  
  明確化の要件:
  1. セミナーのテーマや目的を明確にする
  2. ターゲットオーディエンスのニーズや関心事を考慮する
  3. タイトルが簡潔で分かりやすいことを重視する
  4. タイトルが魅力的で興味を引くことを意識する
  5. タイトルが、参加者にとって普段の業務で活かせそうな具体性をもっていること
  
  今回のセミナー条件：
  1.登壇企業：〇〇〇〇〇〇〇〇〇〇
  2:登壇者：〇〇〇〇〇〇〇〇〇〇
  3:参加してほしい企業：〇〇〇〇〇〇〇〇〇〇
  4:セミナーで取り扱う内容：〇〇〇〇〇〇〇〇〇〇
  
  参考情報として、過去のセミナータイトルを共有します。
  1.〇〇〇〇〇〇〇〇〇〇
  2.〇〇〇〇〇〇〇〇〇〇
  3.〇〇〇〇〇〇〇〇〇〇
  `,
  aa_prompt_title6: 'セミナータイトルの改善',
  aa_prompt_body6: `セミナータイトルを改善したいです。
  現在の参加者を募っているセミナーが、思ったように集客できていません。
  下記に参考情報を記載するので、セミナータイトルを考えていただけますか？
  
  現在のセミナータイトル：
  想定する参加者：
  セミナーで取り扱う内容：
  ・登壇企業は、
  ・登壇する方は、
  ・セミナー内で取り扱う内容は、
  過去に集客がうまくいったセミナータイトル：
  `,
  aa_prompt_title7: 'SEO記事作成のプロンプト',
  aa_prompt_body7: `あなたはプロのWebライターです。以下の仕様に従って、ブログ記事を書いてください。

  #テーマ
  （例）InstagramとTwitter（X）のマーケティングにおける活用方法の違いについて
  
  #目的
  （例）Webマーケターに向けて、マーケティングの領域でどのようにInstagramとTwitter（X）が使えるのかを網羅的に伝えて、その違いを把握した上で効果的に活用するヒントにしてもらう
  
  #記事の結論：
  （例）マーケティングで実現したい目的によって、InstagramとTwitter（X）を上手に使い分けるのが良い。
  
  #注意点
  ・H1～H4で構成する
  ・語尾はですます調にする
  ・箇条書きや表を使用して分かりやすくまとめる
  ・専門用語には補足情報を書く
  `,
  aa_prompt_title8: 'メルマガ作成のプロンプト',
  aa_prompt_body8: `あなたはBtoB向けSaaSプロダクトを展開する企業のメルマガ担当者です。
  以下内容のメルマガを作成してください。
  
  #メルマガの配信目的
  （例）ホワイトペーパーを案内し、興味のある人にはダウンロードしてもらう
  
  #ターゲット
  （例）
  SNS広告（Instagram、FB、LINE、TikTok、YouTubeなど）の運用担当者
  デザイナーに広告クリエイティブの制作を依頼している方
  各媒体におけるクリエイティブの勝ちパターンを知りたい方
  
  #案内するホワイトペーパーのタイトル
  30パターン一挙公開！動画広告クリエイティブの勝ち負けを決めるポイントとは？
  
  #このホワイトペーパーを読むことで分かること
  （例）
  各媒体における勝ちクリエイティブの傾向が分かる
  動画クリエイティブ制作時にやりがちなNG例が分かる
  成果につながる動画広告クリエイティブ制作のポイントが分かる
  
  #注意点
  ・メルマガのタイトル案を5つ程度出す
  ・メルマガ本文の語尾はですます調にする
  ・誰向けにおすすめの内容なのかを分かりやすく記載する
  `,
  com_nav_lang_indonesia: 'Indonesia',
  com_nav_lang_hebrew: 'עברית',
  com_nav_lang_finnish: 'Suomi',
  com_ui_accept: 'I accept',
  com_ui_decline: 'I do not accept',
  com_ui_terms_and_conditions: 'Terms and Conditions',
  com_ui_no_terms_content: 'No terms and conditions content to display',
};
