import { type NextPage } from "next";

type UnsubscribePageProps = {
  params: Promise<{ documentId: string }>;
};

const UnsubscribeContainer = ({
  title,
  message,
}: {
  title: string;
  message?: string;
  documentId?: string;
}) => (
  <div
    className="container text-h3-bold"
    style={{
      width: "100%",
      flex: 1,
      fontFamily: "Roboto",
      marginTop: "20px",
    }}
  >
    <div>{title}</div>
    {message && <p style={{ marginTop: "20px" }}>{message}</p>}
  </div>
);

const UnsubscribePage: NextPage<UnsubscribePageProps> = async ({ params }) => {
  const { documentId } = await params;

  if (!documentId) {
    console.error("UnsubscribePage - No documentID provided");
    return (
      <UnsubscribeContainer
        title="Ошибка отписки"
        message="Не указан идентификатор для отписки."
      />
    );
  }

  try {
    if (!process.env.API_URL || !process.env.TOKEN) {
      console.error("Нет переменной окружения:", {
        apiUrl: process.env.API_URL,
        token: process.env.TOKEN ? "Present" : "Missing",
      });
      throw new Error("Нет токена");
    }

    const apiUrl = `${process.env.API_URL}/subscribers/delete-by-document/${documentId}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    if (response.ok) {
      return (
        <UnsubscribeContainer
          title="Отписка успешна"
          message="Вы успешно отписались от рассылки."
          documentId={documentId}
        />
      );
    } else {
      const errorText = await response.text();
      console.error("Ошибка", {
        status: response.status,
        statusText: response.statusText,
        errorText,
        apiUrl,
      });
      let errorMessage = `Failed to unsubscribe: ${response.status} ${response.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorMessage;
      } catch (parseError) {
        console.error("UnsubscribePage - Error parsing errorText:", parseError);
      }
      throw new Error(errorMessage);
    }
  } catch (error: any) {
    return (
      <UnsubscribeContainer
        title="Ошибка отписки"
        message={error.message || "Произошла ошибка при попытке отписаться"}
        documentId={documentId}
      />
    );
  }
};

export default UnsubscribePage;
