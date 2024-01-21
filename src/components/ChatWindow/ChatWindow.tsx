import { useRef, useState, useEffect } from "react";
import { SparkleFilled } from "@fluentui/react-icons";
// import { chatApi, Approaches, AskResponse, ChatRequest, ChatTurn } from "../../api";
import { Answer, AnswerError, AnswerLoading } from "../../components/Answer";
import { QuestionInput } from "../../components/QuestionInput";
import { ExampleList } from "../../components/Example";
import { UserChatMessage } from "../../components/UserChatMessage";
import { AskResponse, ChatRequest, ChatTurn } from "../../api/models";
// import { AnalysisPanel, AnalysisPanelTabs } from "../../components/AnalysisPanel";
import "./ChatWindow.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setChat } from "../../store/reducers/chatReducer";

const Chat = () => {
  // const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [promptTemplate, setPromptTemplate] = useState<string>("");
  const [retrieveCount, setRetrieveCount] = useState<number>(3);
  const [useSemanticRanker, setUseSemanticRanker] = useState<boolean>(true);
  const [useSemanticCaptions, setUseSemanticCaptions] =
    useState<boolean>(false);
  const [excludeCategory, setExcludeCategory] = useState<string>("");
  const [useSuggestFollowupQuestions, setUseSuggestFollowupQuestions] =
    useState<boolean>(true);

  const lastQuestionRef = useRef<string>("");
  const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const [activeCitation, setActiveCitation] = useState<string>();
  // const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<AnalysisPanelTabs | undefined>(undefined);

  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);

  const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<
    any | undefined
  >(undefined);
  const [answers, setAnswers] = useState<
    [user: string, response: AskResponse][]
  >([]);

  const dispatch = useAppDispatch();
  const { tabs, activeTabId } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (tabs.length > 0) {
      console.log("tabs ChatWindow -- ", tabs)
      const { chat } = tabs.find((tab) => tab.id === activeTabId);
      if (chat.length > 0) {
        lastQuestionRef.current = chat[chat.length - 1][0];
      }else{
        lastQuestionRef.current = "";
      }
      setAnswers(chat);
    }
  }, [activeTabId, tabs]);

  const makeApiRequest = async (question: string) => {
    lastQuestionRef.current = question;

    error && setError(undefined);
    setIsLoading(true);
    setActiveCitation(undefined);
    // setActiveAnalysisPanelTab(undefined);

    try {
      const history: ChatTurn[] = answers.map((a) => ({
        user: a[0],
        bot: a[1].answer,
      }));
      const request: ChatRequest = {
        history: [...history, { user: question, bot: undefined }],
      };
      const result = {
        answer: "Hello[kkkk]<kkk> <<follow-ip question?>>",
        thoughts: null,
        data_points: [],
      };
      // throw Error("errror")
      setAnswers([...answers, [question, result]]);
      dispatch(setChat([...answers, [question, result]]));
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  const onExampleClicked = (example: string) => {
    makeApiRequest(example);
  };

  const onShowCitation = (citation: string, index: number) => {
    if (
      activeCitation === citation &&
      activeAnalysisPanelTab === "AnalysisPanelTabs.CitationTab" &&
      selectedAnswer === index
    ) {
      setActiveAnalysisPanelTab(undefined);
    } else {
      setActiveCitation(citation);
      setActiveAnalysisPanelTab("AnalysisPanelTabs.CitationTab");
    }

    setSelectedAnswer(index);
  };
  useEffect(
    () => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }),
    [isLoading, answers]
  );

  return (
    <div className={"containers"}>
      <div className={"chatRoot"}>
        <div className={"chatContainer"}>
          {!lastQuestionRef.current ? (
            <div className={"chatEmptyState"}>
              {/* <SparkleFilled
                fontSize={"120px"}
                primaryFill={"rgba(115, 118, 225, 1)"}
                aria-hidden="true"
                aria-label="Chat logo"  
              />
              <h1 className={"chatEmptyStateTitle mb-3"}>
                Chat with your data
              </h1>
              <h2 className={"chatEmptyStateSubtitle mb-4"}>
                Ask anything or try an example
              </h2>
              <ExampleList onExampleClicked={onExampleClicked} /> */}
              <div className="chatEmptyHeader">
                <h1>Welcome to Gen AI for Tata</h1>
                <p>
                  use the below input field to get started, Use natural language
                  to drive the conversation.
                </p>
              </div>
            </div>
          ) : (
            <div className={"chatMessageStream"}>
              {answers.map((answer, index) => (
                <div key={index}>
                  <UserChatMessage message={answer[0]} />
                  <div className={"chatMessageGpt"}>
                    <Answer
                      key={index}
                      answer={answer[1]}
                      onCitationClicked={(c) => onShowCitation(c, index)}
                      onFollowupQuestionClicked={(q) => makeApiRequest(q)}
                      showFollowupQuestions={
                        useSuggestFollowupQuestions &&
                        answers.length - 1 === index
                      }
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <>
                  <UserChatMessage message={lastQuestionRef.current} />
                  <div className={"chatMessageGptMinWidth"}>
                    <AnswerLoading />
                  </div>
                </>
              )}
              {error ? (
                <>
                  <UserChatMessage message={lastQuestionRef.current} />
                  <div className={"chatMessageGptMinWidth"}>
                    <AnswerError
                      error={error.toString()}
                      onRetry={() => makeApiRequest(lastQuestionRef.current)}
                    />
                  </div>
                </>
              ) : null}
              <div ref={chatMessageStreamEnd} />
            </div>
          )}

          <div className={"chatInput"}>
            <QuestionInput
              clearOnSend
              placeholder="Type a new question"
              disabled={isLoading}
              onSend={(question: any) => makeApiRequest(question)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
