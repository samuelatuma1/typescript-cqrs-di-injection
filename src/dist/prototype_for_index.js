// let cacheTest = iocContainer.resolve(TestCache);
// app.get("/test-redis",  async (req, res, next) => {
//   let response = await cacheTest.test()
//   return res.json(response);
// })
// @injectable()
// class TestCache{
//   constructor(@inject(IICacheService) private readonly cache: ICacheService){
//   }
//   public test = async () => {
//     await this.cache.addAsync("Test_IN_CONFIG_2", {name: "Test in config 2000-100"}, 50)
//     let saved = await this.cache.getAsync("Test_IN_CONFIG_2")
//     return saved
//   }
// }
/*
// consumer producer test

class Order {
  name: string;
  price: number;
  qty: number
}


@injectable()
class TestRedisEventservice{
   public constructor(@inject(IIEventService)private readonly eventService: IEventService){

   }
   testsendMessag = async (order: Order) => {
      let streamName = "STREAM_TEST"
      let d = new EventQueueSizeStrategyRetention({duration: 30, unit: TimeUnit.seconds});
      return await this.eventService.publishToQueue(streamName, order, d);
   }
}

let resolvedEventService = iocContainer.resolve(IIEventService) as unknown as IEventService

app.post("/test-redis-produce",  async (req: Request<{}, {}, Order>, res: Response, next: NextFunction) => {
  let eventService = iocContainer.resolve(TestRedisEventservice)
  let response = await eventService.testsendMessag(req.body)
  return res.json(response);
})

resolvedEventService.subscribeToQueue({
  queueName: "STREAM_TEST",
  consumerGroupName: "STREAM_TEST_GROUP",
  consumerName: "STREAM_TEST_CONSUMER",
  maxNumberOfEntries: 10,
  messageHandler: async (message: any, messageId: string) => {
    console.log("Handler for STREAM_TEST Event")
    let data = message
    console.log({message, messageId})
    return true;
  }
})
*/ 
