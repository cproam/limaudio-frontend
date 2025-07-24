import { type NextPage } from "next";

type UnsubscribePageProps = {
  params: Promise<{ email: string }>;
};

const UnsubscribeContainer = ({
  title,
  message,
  email,
}: {
  title: string;
  message?: string;
  email?: string;
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
    {email && <p className="">Email: {decodeURIComponent(email)}</p>}
  </div>
);

const UnsubscribePage: NextPage<UnsubscribePageProps> = async ({ params }) => {
  const { email } = await params;

  if (!email) {
    console.error("UnsubscribePage - No email provided");
    return (
      <UnsubscribeContainer
        title="Ошибка отписки"
        message="Не указан email для отписки."
      />
    );
  }

  try {
    if (!process.env.API_URL || !process.env.TOKEN) {
      console.error("UnsubscribePage - Missing environment variables:", {
        apiUrl: process.env.API_URL,
        token: process.env.TOKEN ? "Present" : "Missing",
      });
      throw new Error("Server configuration error: Missing API_URL or TOKEN");
    }

    const apiUrl = `${process.env.API_URL}/subscribers/delete-by-email/${email}`;

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
          email={email}
        />
      );
    } else {
      const errorText = await response.text();
      console.error("UnsubscribePage - Fetch Error:", {
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
      />
    );
  }
};

export default UnsubscribePage;
