/*                                                                                                                                     
 * DigiPot.pde - Example sketch for Arduino library for managing digital potentiometers X9C1xxx (xxx = 102,103,104,503).
 * By Timo Fager, Jul 29, 2011.                                                                                                        
 * Released to public domain.                                                                                                          
 *
 * For this example, connect your X9C103P (or the like) as follows:
 * 1 - INC - Arduino pin 2
 * 2 - U/D - Arduino pin 3
 * 3 - VH  - 5V
 * 4 - VSS - GND
 * 5 - VW  - Output: 150 Ohm resistor -> LED -> GND
 * 6 - VL  - GND
 * 7 - CS  - Arduino pin 4
 * 8 - VCC - 5V
 *
 **/


#include <DigiPotX9Cxxx.h>
String inData = "";
boolean toggleComplete = false;
boolean toggleComplete2 = false;
int estat = 0;
DigiPot pot(2,3,4);

void setup() {
  Serial.begin(9600);
  pinMode(13,OUTPUT);
  /*
    for (int i=0; i<100; i++) {
    Serial.print("Increasing, i = ");
    Serial.println(i, DEC);
    pot.increase(1);
    delay(200);
  }
  for (int i=0; i<100; i++) {
    Serial.print("Decreasing, i = ");
    Serial.println(i, DEC);
    pot.decrease(1);
    delay(200);
  }
  */
  pot.increase(100);

}
int control=0;
void loop() {
  /*
  if (Serial.available()) {
    Serial.write(Serial.read());
  }*/
  inData = "";
  int estatus =0;
  String dato,dato1,dato2,dato3  ;
  //Serial.print("HALLALA");
  while(Serial.available() > 0 && toggleComplete == false && toggleComplete2 == false) {
        while(Serial.available() > 0){
        char received = Serial.read();
        //Serial.println("RECIBIDO");
        String received1 ="";
        received1.concat(received);
        if(received == 'E'){ // end character for toggle LED
          toggleComplete = true;
          Serial.println("E DETECTED");
        }else if(received == 'A'){ // end character for toggle LED
          toggleComplete2 = true;
          Serial.println("A DETECTED");
        }else if(received == 'F'){ // end character for toggle LED
          control = 1;
          Serial.println("F DETECTED");
        }
        else if(received!='E' && received1.toInt()>=0 && received1!=" " && received1!="" && received1!="\r" && received1!="\n" && received!= 'A' && received != 'E' && received1!="\r\n"){ 
          inData.concat(received1);
          //dato.concat(received);
          if(estatus==0){Serial.println("OK"); dato1.concat(received);estatus++; }
          else if(estatus==1){ dato2.concat(received) ; estatus++; }
          else if(estatus==2){ dato3.concat(received);estatus++;dato3.concat(dato2);dato3.concat(dato1); }
          Serial.print("ESCRITO EL NUMERO --> ");
          Serial.println(received);
          Serial.print("Y GUARDADO HASTA AHORA -> ");
          Serial.print(dato3);
         
        }
        }
       // Serial.println("INTO WHILE");
        
    }
    estatus = 0;
    //Serial.println("OUTWHILE");
    toggleComplete = false;
    toggleComplete2 = false;
    if(inData!=""){
    Serial.println(inData);
    }
    if(inData!="" && control!=1){pot.increase(inData.toInt());Serial.print("incremento");Serial.println(inData.toInt());}
    else if(inData!="" && control!=0){pot.decrease(inData.toInt()); control=0;;Serial.print("decremento");Serial.println(inData.toInt());}
/*
    for(int i= 0 ; i<= inData.toInt()/100;i++){
      digitalWrite(13,HIGH);
      delay(200);
      digitalWrite(13,LOW);
      delay(200);
    
    }
      for (int i=0; i<100; i++) {
    Serial.print("Increasing, i = ");
    Serial.println(i, DEC);
    pot.increase(1);
    delay(200);
  }

*/
    
    
  /*
  //Serial.println("Starting");  

  for (int i=0; i<100; i++) {
    Serial.print("Increasing, i = ");
    Serial.println(i, DEC);
    pot.increase(1);
    delay(200);
  }

  for (int i=0; i<100; i++) {
    Serial.print("Decreasing, i = ");
    Serial.println(i, DEC);
    pot.decrease(1);
    delay(200);
  }
  */

}


