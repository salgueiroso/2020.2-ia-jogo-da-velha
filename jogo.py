from minmax import MinMaxPodaAlfaBeta
from random import randint, choice


class Jogo:

    def __init__(self):
        self.maquina = 1
        self.oponente = 2
        self.minmax = MinMaxPodaAlfaBeta(self.__pontuacao, self.__fazer_minha_jogada, self.__fazer_oponente_jogada)

    def run(self, estado: []) -> (int, int):

        if len(set(estado)) <= 1:
            indices = [a_tuple[0] for a_tuple in list(filter(lambda x: x[1] == 0, enumerate(estado)))]
            movimento = choice(indices)
        else:
            movimento = self.minmax.alfa_beta_search(estado)

        return movimento // 3, movimento % 3

    def __fazer_minha_jogada(self, estado: [], posicao):
        estado[posicao] = self.maquina

    def __fazer_oponente_jogada(self, estado: [], posicao):
        estado[posicao] = self.oponente

    def __pontuacao(self, estado: []) -> int:

        for i in range(0, 3):
            a = estado[i * 3]
            b = estado[i * 3 + 1]
            c = estado[i * 3 + 2]
            if a == b and b == c and a != 0:
                return 3 if a == self.maquina else -3 if a == self.oponente else 0

        for i in range(0, 3):
            a = estado[i]
            b = estado[i + 3]
            c = estado[i + 6]
            if a == b and b == c and a != 0:
                return 3 if a == self.maquina else -3 if a == self.oponente else 0

        a = estado[0]
        b = estado[4]
        c = estado[8]
        if a == b and b == c and a != 0:
            return 3 if a == self.maquina else -3 if a == self.oponente else 0

        a = estado[6]
        b = estado[4]
        c = estado[2]
        if a == b and b == c and a != 0:
            return 3 if a == self.maquina else -3 if a == self.oponente else 0


        return 0
