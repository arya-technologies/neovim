package com.termux

import android.os.AsyncTask
import com.facebook.react.bridge.*

class ShellModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ShellModule"
    }

    @ReactMethod
    fun runCommand(command: String, promise: Promise) {
        ExecuteShellCommandTask(command, promise).execute()
    }

    private class ExecuteShellCommandTask(val command: String, val promise: Promise) : AsyncTask<Void, Void, String>() {
        override fun doInBackground(vararg params: Void?): String {
            return try {
                val process = Runtime.getRuntime().exec(command)
                val reader = process.inputStream.bufferedReader()
                val output = StringBuilder()
                reader.forEachLine { output.append(it).append("\n") }
                reader.close()
                output.toString()
            } catch (e: Exception) {
                e.message ?: "Error executing command"
            }
        }

        override fun onPostExecute(result: String) {
            promise.resolve(result)
        }
    }
}

