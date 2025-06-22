import { pipeline, env } from "@xenova/transformers";

// Inject your Hugging Face token
env.allowRemoteModels = true;
env.allowLocalModels = false;
(env as any).HF_TOKEN = process.env.HUGGINGFACE_HUB_TOKEN!;

// Singleton pipeline cache
class PipelineSingleton {
  private static instance: any;

  public static async getInstance() {
    if (!PipelineSingleton.instance) {
      PipelineSingleton.instance = await pipeline(
        "text-generation",
        "Xenova/LaMini-Flan-T5-783M"
      );
    }
    return PipelineSingleton.instance;
  }
}

export default PipelineSingleton;