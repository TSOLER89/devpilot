function ChatProviderSelector({
  selectedProvider,
  onSelectProvider,
  disabled,
}) {
  return (
    <div className="provider-controls">
      <label className="provider-field">
        <span>AI provider</span>
        <select
          aria-label="AI provider"
          value={selectedProvider}
          onChange={(event) => onSelectProvider(event.target.value)}
          disabled={disabled}
        >
          <option value="ollama">Ollama (Local AI)</option>
          <option value="openai">OpenAI</option>
        </select>
      </label>
    </div>
  );
}

export default ChatProviderSelector;
