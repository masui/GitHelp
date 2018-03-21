#include <stdio.h>
#include <unistd.h>
#include <termios.h>

struct termios state, oldstate;

void echo_off()
{
    tcgetattr(0, &oldstate);
    state = oldstate;
    state.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(0, TCSANOW, &state);
}

void echo_on()
{
    tcsetattr(0, TCSANOW, &oldstate);
}

int main(){
    char buf[10];
    char *p = buf;
    char c;

    echo_off();
    
    write(0,"\x1b[6n",4);

    for (int i=0;;i++){
        read(0,&c,1);
        if(c >= 0x30 && c <= 0x39) *p++ = c;
        if(c == ';') *p++ = ' ';
        if(c == 'R') break;
    }
    *p = '\0';

    echo_on();

    printf("%s\n",buf);
}
