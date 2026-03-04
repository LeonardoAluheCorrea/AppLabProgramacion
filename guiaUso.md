Guia de uso:

importar la clase
    import java.util.concurrent.Semaphore

modo de uso

Semaphore mutex= new Semaphore(1) //indicamos la cantidad de permisos

nombreMetodo() thorws Interrupted Exception{
mutex.aquire();

//seccion critica

mutex.release();

}
