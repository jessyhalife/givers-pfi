import React from "react";
import { View, Text, ScrollView } from "react-native";
import { THEMECOLOR } from "../const.js";
import { Button, H1 } from "native-base";
import Header from "../components/header";
const Terms = props => {
  return (
    <View>
      <Header title={"Términos y Condiciones"}></Header>
      <ScrollView>
        <View style={{ margin: 30 }}>
          <Text style={{ fontSize: 14 }}>
            En primera instancia se establece que los desarrolladores se
            reservan la facultad de modificar en cualquier momento las
            condiciones generales establecidas y se hace recomendación de que
            los usuarios consulten periódicamente estos términos. En segunda
            instancia se establece que el usuario deberá respetar en todo
            momento los términos y condiciones establecidos en dichas
            condiciones generales de uso de la aplicación. El usuario al
            aceptarlas manifiesta que utilizará la aplicación de forma diligente
            y asumiendo cualquier responsabilidad que pudiera derivarse del
            incumplimiento de las normas. Estará prohibida todo tipo de
            discriminación ya sea por religión, sexo, color, condición social
            y/o capacidades mentales. También la incitación al odio, el
            bullying, las ofensas y las manifestaciones políticas de cualquier
            índole. En tercera instancia se establecen las responsabilidades de
            la aplicación, informando que el usuario conoce y acepta que la
            aplicación no otorga ninguna garantía de cualquier naturaleza, ya
            sea expresa o implícita, sobre los datos, contenidos, información y
            servicios que se incorporan y ofrecen desde la aplicación. La
            aplicación y sus desarrolladores no son responsables por el uso
            inadecuado de la información por parte de los usuarios. También se
            informa que los propietarios de la aplicación tienen la libertad de
            suspender o eliminar cuentas de usuario en caso de determinar
            comportamientos inadecuados y/o que no se ajusten a los términos y
            condiciones de uso establecidos. Además, son dueños de la
            información registrada dentro de la plataforma y pueden utilizar la
            misma para fines científicos, investigaciones o para cualquier otra
            índole relacionada con ayudar a las personas en situación de calle.
            Tienen la facultad de modificar, eliminar contenido y realizar
            manipulaciones con los datos que se encuentren registrados por
            cualquier usuario dentro de la aplicación. En cuarta instancia se
            establece que todos los contenidos, marcas, logos, dibujos,
            documentación o cualquier otro elemento susceptible de protección
            por la legislación de propiedad intelectual o industrial, que sean
            accesibles en la aplicación corresponden exclusivamente a los
            propietarios o a sus legítimos titulares y quedan expresamente
            reservados todos los derechos sobre los mismos. Por último, se
            establece que todas las condiciones de uso mencionadas se rigen y se
            interpretan de acuerdo con las leyes de Argentina. Para cualquier
            reclamo serán competentes los juzgados y tribunales de la Ciudad de
            Buenos Aires. Todas las notificaciones, requerimientos, peticiones y
            otras comunicaciones que el usuario desee efectuar a los
            propietarios de la aplicación deberán realizarse por escrito.
          </Text>
          <View
            style={{ flexDirection: "row", width: "100%", marginBottom: 40 }}
          >
            <Button
              bordered
              light
              style={{
                width: "50%",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                No acepto
              </Text>
            </Button>
            <Button
              style={{
                backgroundColor: THEMECOLOR,
                width: "50%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Acepto
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Terms;
