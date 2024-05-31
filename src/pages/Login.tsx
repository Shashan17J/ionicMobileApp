import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";

let INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(true);
  const [present, dismiss] = useIonLoading();

  // @capacitor/preferences Plugin
  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      console.log("file: CheckStorage", seen);
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present("Logging in...");
    setTimeout(async () => {
      dismiss();
      router.push("/app", "root");
    }, 2000);
  };

  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };
  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };
  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" scrollY={false}>
            <IonGrid fixed>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-text-center ion-padding">
                    <img
                      src="https://external-preview.redd.it/GPgMeD56_XbVLOqzTZYWUVeH-Xi691CVetkfLLXEOh4.jpg?auto=webp&s=265c72239d13f4041672e0887baa39cdde8e561c"
                      alt="Logo"
                      width={"100%"}
                      height={270}
                    />
                  </div>
                </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={doLogin}>
                        <IonInput
                          fill="outline"
                          labelPlacement="floating"
                          label="Email"
                          type="email"
                          placeholder="Enter Email"
                        ></IonInput>
                        <IonInput
                          className="ion-margin-top"
                          fill="outline"
                          labelPlacement="floating"
                          label="Password"
                          type="password"
                          placeholder="Enter Password"
                        ></IonInput>
                        <IonButton
                          type="submit"
                          expand="full"
                          className="ion-margin-top"
                        >
                          {" "}
                          Login{" "}
                          <IonIcon icon={logInOutline} slot="end"></IonIcon>
                        </IonButton>
                        <IonButton
                          routerLink="/register"
                          type="submit"
                          expand="full"
                          className="ion-margin-top"
                        >
                          {" "}
                          Create Account{" "}
                        </IonButton>
                        <IonButton
                          onClick={seeIntroAgain}
                          fill="clear"
                          size="small"
                          color={"medium"}
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                        >
                          Watch intro again
                          <IonIcon icon={personCircleOutline} slot="end" />
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
