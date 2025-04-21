import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigService } from '../../env-config.service'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [join(__dirname, '../../../../../../.env.test')],
        }),
      ],
      providers: [EnvConfigService],
    }).compile()

    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return the variable PORT', () => {
    expect(sut.getAppPort()).toBe(3000)
  })

  it('should return the variable NODE_ENV', () => {
    expect(sut.getNodeEnv()).toBe('test')
  })
})
