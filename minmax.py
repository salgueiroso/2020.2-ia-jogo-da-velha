from sys import maxsize
from math import inf


class MinMaxPodaAlfaBeta:

    def __init__(self, heuristica, minha_jogada, oponente_jogada):
        self.heuristica = heuristica
        self.minha_jogada = minha_jogada
        self.oponente_jogada = oponente_jogada

    def alfa_beta_search(self, estado_base: []) -> int:

        max_state = self.__max_value(estado_base.copy(), -inf, inf)

        return max_state[1]

    def __max_value(self, estado: [], alfa: int, beta: int, posicao_mudanca: int = None) -> (int, int):

        if self.__testa_no_folha(estado):
            return self.heuristica(estado), posicao_mudanca

        v = -inf

        for i in self.__proximas_posicoes_livres(estado):

            self.minha_jogada(estado, i)

            mv = self.__min_value(estado.copy(), alfa, beta, i if posicao_mudanca is None else posicao_mudanca)

            v = max(v, mv[0])

            if v >= beta:
                return v, mv[1]

            alfa = max(alfa, v)

        return v, mv[1]

    def __min_value(self, estado: [], alfa: int, beta: int, posicao_mudanca: int) -> (int, int):

        if self.__testa_no_folha(estado):
            return self.heuristica(estado), posicao_mudanca

        v = inf

        for i in self.__proximas_posicoes_livres(estado):

            self.oponente_jogada(estado, i)

            mv = self.__max_value(estado.copy(), alfa, beta, posicao_mudanca)

            v = min(v, mv[0])

            if v <= alfa:
                return v, mv[1]

            beta = min(beta, v)

        return v, mv[1]

    def __testa_no_folha(self, estado: []) -> bool:
        return 0 not in estado

    def __proximas_posicoes_livres(self, estado) -> []:
        ret = list(filter(lambda x: x[1] == 0, enumerate(estado)))
        ret2 = [a_tuple[0] for a_tuple in ret]
        return ret2
